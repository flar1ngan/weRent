import { UserCardType } from "@/utils/types";
import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getLastMessage, getProfile, getUserDetails } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";

async function UserCard({
  user,
  isActive,
}: {
  user: UserCardType;
  isActive: boolean;
}) {
  const { firstName, lastName, username, profileImg } = user;
  const { userId: currentUserId } = auth();
  if (!currentUserId) redirect("/");
  if (!user.clerkId) return null;
  const lastMessage = await getLastMessage(currentUserId, user.clerkId);
  if (!profileImg || !username) redirect("/");
  return (
    <Link href={`/chat/${username}`}>
      <div
        className={`py-1 rounded-lg cursor-pointer transition-colors duration-200 ${
          isActive ? "bg-muted" : "hover:bg-muted"
        }`}
      >
        <div className="flex items-center p-2">
          <Image
            src={profileImg}
            alt={username}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold">
              {firstName + " " + lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              {lastMessage
                ? lastMessage.length > 60
                  ? `${lastMessage.substring(0, 25)}...`
                  : lastMessage
                : null}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
