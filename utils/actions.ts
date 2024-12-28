"use server";

import {
  imageSchema,
  itemSchema,
  messageSchema,
  profileSchema,
  reviewSchema,
  zodValidate,
} from "./schemas";
import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clerkClient, currentUser, getAuth } from "@clerk/nextjs/server";
import { uploadImage } from "./supabase";
import { calculateTotal } from "./calendar";

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

const getAdminUser = async () => {
  const user = await getUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
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
    return {
      message: favoriteId ? "Dzēsts no favorītu" : "Saglabāts favorītos",
    };
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
  return favorites.map((favorite) => favorite.item);
};

export const getItemDetails = (id: string) => {
  return db.item.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      rents: {
        select: {
          startDate: true,
          endDate: true,
        },
      },
    },
  });
};

export const createReview = async (prevState: any, formData: FormData) => {
  const user = await getUser();
  try {
    const data = Object.fromEntries(formData);
    const validatedData = zodValidate(reviewSchema, data);
    await db.review.create({
      data: {
        ...validatedData,
        profileId: user.id,
      },
    });
    revalidatePath(`/items/${validatedData.itemId}`);
    return { message: "Atsauksme ir publicēta" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const getItemReviews = async (itemId: string) => {
  const reviews = await db.review.findMany({
    where: {
      itemId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          lastName: true,
          username: true,
          profileImg: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const deleteReview = async (prevState: {
  reviewId: string;
  currentPathname: string;
}) => {
  const { reviewId, currentPathname } = prevState;
  const user = await getUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    });
    revalidatePath(currentPathname);
    return { message: "Atsauksme ir veiksmīgi izdzēsta" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const checkAuthor = async (reviewId: string) => {
  const user = await currentUser();
  try {
    const review = await db.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    return user?.id === review?.profileId;
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export async function getItemRating(itemId: string) {
  const result = await db.review.groupBy({
    by: ["itemId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      itemId,
    },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed() ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
}

export const checkExistingReview = async (userId: string, itemId: string) => {
  return db.review.findFirst({
    where: {
      profileId: userId,
      itemId: itemId,
    },
  });
};

export const createRent = async (prevState: {
  itemId: string;
  startDate: Date;
  endDate: Date;
}) => {
  const user = await getUser();
  const { itemId, startDate, endDate } = prevState;
  const item = await db.item.findUnique({
    where: {
      id: itemId,
    },
    select: {
      price: true,
    },
  });
  if (!item) {
    return { message: "Priekšmets nav atrasts" };
  }
  const { totalPrice, totalDays } = calculateTotal({
    startDate,
    endDate,
    price: item.price,
  });
  try {
    const rent = await db.rent.create({
      data: {
        startDate,
        endDate,
        totalDays,
        totalPrice,
        profileId: user.id,
        itemId,
      },
    });
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
  redirect("/reservations");
};

export const getReservations = async () => {
  const user = await getUser();
  const reservations = await db.rent.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      item: {
        select: {
          id: true,
          name: true,
        },
      },
      profile: {
        select: {
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reservations;
};

export const deleteReservation = async (prevState: { rentId: string }) => {
  const { rentId } = prevState;
  const user = await getUser();
  try {
    const result = await db.rent.delete({
      where: {
        id: rentId,
        profileId: user.id,
      },
    });
    revalidatePath("/reservations");
    return { message: "Rezervācija ir veiksmīgi izdzēsta" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const deleteItem = async (prevState: { itemId: string }) => {
  const { itemId } = prevState;
  const user = await getUser();
  try {
    await db.item.delete({
      where: {
        id: itemId,
      },
    });
    revalidatePath("/rent");
    return { message: "Sludinājums ir veiksmīgi izdzēsts" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const getUserItems = async () => {
  const user = await getUser();
  const items = await db.item.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });
  const itemsWithReservations = await Promise.all(
    items.map(async (item) => {
      const totalPriceSum = await db.rent.aggregate({
        where: {
          itemId: item.id,
        },
        _sum: {
          totalPrice: true,
        },
      });
      return {
        ...item,
        totalPriceSum: totalPriceSum._sum.totalPrice,
      };
    })
  );
  return itemsWithReservations;
};

export const getRentDetails = async (itemId: string) => {
  const user = await getUser();
  return db.item.findUnique({
    where: {
      id: itemId,
      profileId: user.id,
    },
  });
};

export const updateItem = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getUser();
  const itemId = formData.get("id") as string;
  try {
    const data = Object.fromEntries(formData);
    const validatedData = zodValidate(itemSchema, data);
    await db.item.update({
      where: {
        id: itemId,
        profileId: user.id,
      },
      data: {
        ...validatedData,
      },
    });
    revalidatePath(`/rent/${itemId}/edit`);
    return { message: "Sludinājums ir veiksmīgi rediģēts" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const updateItemImage = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getUser();
  const itemId = formData.get("id") as string;
  try {
    const image = formData.get("image") as File;
    const validatedData = zodValidate(imageSchema, { image });
    const path = await uploadImage(validatedData.image);
    await db.item.update({
      where: {
        id: itemId,
        profileId: user.id,
      },
      data: {
        image: path,
      },
    });
    revalidatePath(`/rent/${itemId}/edit`);
    return { message: "Attēls ir veiksmīgi atjaunināts" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};

export const getReservationList = async () => {
  const user = await getUser();
  const reservations = await db.rent.findMany({
    where: {
      item: {
        profileId: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      item: {
        select: {
          id: true,
          name: true,
          price: true,
          city: true,
        },
      },
      profile: {
        select: {
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
  });
  return reservations;
};

export const getStats = async () => {
  await getAdminUser();
  const usersCount = await db.profile.count();
  const itemsCount = await db.item.count();
  const reservationsCount = await db.rent.count();

  return {
    usersCount,
    itemsCount,
    reservationsCount,
  };
};

export const getAllItems = async () => {
  const items = await db.item.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
      profile: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return items;
};

export const getAllUserItems = async (username: string) => {
  const user = await db.profile.findFirst({
    where: {
      username,
    },
  });
  const items = await db.item.findMany({
    where: {
      profileId: user?.clerkId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      city: true,
    },
  });
  return items;
};

export const getUserDetails = async (username: string) => {
  return db.profile.findFirst({
    where: {
      username: username,
    },
  });
};

export const getUserDetailsById = async (id: string) => {
  return db.profile.findFirst({
    where: {
      id: id,
    },
  });
};

export const getUserDetailsByClerkId = async (id: string) => {
  return db.profile.findFirst({
    where: {
      clerkId: id,
    },
  });
};

export const getAllOtherUsers = async () => {
  const user = await getUser();
  return db.profile.findMany({
    where: {
      NOT: {
        clerkId: user.id,
      },
    },
  });
};


export const getAllOtherUsersSorted = async () => {
  const currentUser = await getUser();
  const currentClerkId = currentUser.id;

  const allOtherUsers = await getAllOtherUsers()
  
  const grouped = await db.message.groupBy({
    by: ["senderId", "receiverId"],
    where: {
      OR: [
        { senderId: currentClerkId },
        { receiverId: currentClerkId },
      ],
    },
    _max: {
      createdAt: true,
    },
    orderBy: {
      _max: {
        createdAt: "desc",
      },
    },
  });

  
  const conversations = grouped.map((group) => {
    const partnerId =
    group.senderId === currentClerkId ? group.receiverId : group.senderId;
    
    return {
      partnerId,
      lastMessageTime: group._max.createdAt,
    };
  });

  const combined = allOtherUsers.map((user) => {
    const convo = conversations.find((c) => c.partnerId === user.clerkId);
    return {
      ...user,
      lastMessageTime: convo ? convo.lastMessageTime : null,
    };
  });


  combined.sort((a, b) => {
    const timeA = a.lastMessageTime ? a.lastMessageTime.getTime() : 0;
    const timeB = b.lastMessageTime ? b.lastMessageTime.getTime() : 0;
    return timeB - timeA;
  });

  return combined;
};


export const postMessage = async (formData: FormData): Promise<void> => {
  const data = Object.fromEntries(formData);
  const validatedData = zodValidate(messageSchema, data);
  const { content, receiverId, senderId } = validatedData;
  const receiver = await getUserDetailsByClerkId(receiverId)
  if(!receiver) redirect("/chat")
  await db.message.create({
    data: {
      senderId: senderId,
      receiverId: receiverId,
      content: content,
    },
  });
  revalidatePath(`/chat/${receiver.username}`)
};

  export const getMessages = async(receiverUsername:string) => {
    const user = await getUser()
    const receiver = await getUserDetails(receiverUsername)
    if(!receiver) redirect("/chat")
    const messages = await db.message.findMany({
      where:{
        OR: [
          {senderId:user.id, receiverId:receiver.clerkId},
          {senderId:receiver.clerkId, receiverId: user.id}
        ]
      },
      orderBy:{
        createdAt:"asc"
      }
    })
    return messages;
  }
