import { UserCardType } from "@/utils/types";
import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

function UserCard({
  user,
  isActive,
}: {
  user: UserCardType;
  isActive: boolean;
}) {
  const { firstName, lastName, username, profileImg } = user;
  if(!profileImg || !username) redirect("/")
  return (
    <Link href={`/chat/${username}`}>
      <Card
        className={`cursor-pointer transition-colors duration-200 ${
          isActive
            ? "bg-primary text-white"
            : "hover:bg-muted"
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
            <p className="font-medium">{firstName + " " + lastName}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default UserCard;
