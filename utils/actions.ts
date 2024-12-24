"use server";

import { imageSchema, itemSchema, profileSchema, zodValidate } from "./schemas";
import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { uploadImage } from "./supabase";

export const signupAction = async (prevState: unknown, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("kļūda");
    const data = Object.fromEntries(formData);
    const validatedData = zodValidate(profileSchema, data);
    await db.profile.create({
      data: {
        clerkId: user.id,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        username: validatedData.username,
        email: user.emailAddresses[0].emailAddress,
        profileImg: user.imageUrl ?? "",
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        profileExist: true,
      },
    });
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
  redirect("/");
};

export const getProfileImg = async () => {
  const user = await currentUser();
  if (!user) return null;
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImg: true,
    },
  });
  return profile?.profileImg;
};

const getUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("kļūda");
  }
  if (!user.privateMetadata.profileExist) redirect("/profile/signup");
  return user;
};

export const getProfile = async () => {
  const user = await getUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect("/profile/signup");
  return profile;
};

export const updateProfile = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getUser();
  try {
    const data = Object.fromEntries(formData);
    const validatedData = zodValidate(profileSchema, data);
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        username: validatedData.username,
      },
    });
    revalidatePath("/profile");
    return { message: "Profils ir atjaunināts" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const updateProfileImage = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getUser();
  try {
    const image = formData.get("image") as File;
    const validatedData = zodValidate(imageSchema, { image });
    const path = await uploadImage(validatedData.image);
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImg: path,
      },
    });
    revalidatePath("/profile");
    return { message: "Profila attēls ir veiksmīgi atjaunināts" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const createItem = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getUser();
  try {
    const data = Object.fromEntries(formData);
    const image = formData.get("image") as File;
    const validatedData = zodValidate(itemSchema, data);
    const validatedImage = zodValidate(imageSchema, { image: image });
    const path = await uploadImage(validatedImage.image);

    await db.item.create({
      data: {
        ...validatedData,
        image: path,
        profileId: user.id,
      },
    });
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
  redirect("/");
};

export const getItems = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const items = await db.item.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      price: true,
      city: true,
      image: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return items;
};

export const getFavoriteId = async ({ itemId }: { itemId: string }) => {
  const user = await getUser();
  const favorite = await db.favorite.findFirst({
    where: {
      itemId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavorite = async (prevState: {
  itemId: string;
  favoriteId: string | null;
  currentPathname: string;
}) => {
  const user = await getUser();
  const { itemId, favoriteId, currentPathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          itemId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(currentPathname);
    return { message: favoriteId ? "Dzēsts no favorītu" : "Saglabāts favorītos" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const getFavorites = async () => {
  const user = await getUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      item: {
        select: {
          id: true,
          name: true,
          city: true,
          price: true,
          image: true,
        },
      },
    },
  });
  return favorites.map((favorite)=> favorite.item)
};

export const getItemDetails = (id:string) => {
  return db.item.findUnique({
    where:{
      id
    },
    include:{
      profile: true,
    }
  })
}