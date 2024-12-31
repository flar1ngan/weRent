import Image from "next/image";
import Link from "next/link";

type UserInfoType = {
  profile: {
    username: string;
    profileImg: string;
    firstName: string;
    lastName: string;
  };
};

function UserInfo({
  profile: { username, profileImg, firstName, lastName },
}: UserInfoType) {
  return (
    <article className="grid grid-cols-[auto,1fr] gap-2 items-center">
      <Link href={`/profile/${username}`}>
        <Image
          src={profileImg}
          alt={firstName}
          width={48}
          height={48}
          className="rounded-full w-10 h-10 object-cover"
        />
      </Link>
      <Link href={`/profile/${username}`}>
        <div>
          <span className="font-bold">{firstName + " " + lastName}</span>
        </div>
      </Link>
    </article>
  );
}

export default UserInfo;
