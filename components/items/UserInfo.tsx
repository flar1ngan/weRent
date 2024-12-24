import Image from "next/image";

type UserInfoType = {
  profile: {
    profileImg: string;
    firstName: string;
  };
};

function UserInfo({ profile: { profileImg, firstName } }: UserInfoType) {
  return (
    <article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        src={profileImg}
        alt={firstName}
        width={48}
        height={48}
        className="rounded w-12 h-12 object-cover"
      />
      <div>
        <p>Publicētājs: <span className="font-bold">{firstName}</span></p>
        <p className="text-muted-foreground font-light">
            Superhost &middot; 2 years hosting
        </p>
      </div>
    </article>
  );
}

export default UserInfo;
