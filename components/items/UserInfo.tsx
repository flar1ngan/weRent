import Image from "next/image";
import Link from "next/link";

type UserInfoType = {
  profile: {
    username: string
    profileImg: string;
    firstName: string;
  };
};

function UserInfo({ profile: { username, profileImg, firstName } }: UserInfoType) {
  return (
    <article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        src={profileImg}
        alt={firstName}
        width={48}
        height={48}
        className="rounded w-12 h-12 object-cover"
      />
      <Link href={`/profile/${username}`}>
      <div>
        <p>Publicētājs: <span className="font-bold">{firstName}</span></p>
      </div>
      </Link>
    </article>
  );
}

export default UserInfo;
