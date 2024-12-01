"use server";

import { profileSchema, zodValidate } from "./schemas";
import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const signupAction = async (prevState: unknown, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("kļūda");
    const data = Object.fromEntries(formData);
    const validatedData = zodValidate(profileSchema,data)
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
    const validatedData = zodValidate(profileSchema,data)
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          username: validatedData.username,
      }
    });
    revalidatePath("/profile");
    return { message: "Profils ir atjaunināts" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "kļūda" };
  }
};
