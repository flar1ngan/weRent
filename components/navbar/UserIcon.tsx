import { LuUser2 } from "react-icons/lu";
import { getProfileImg } from "@/utils/actions";
import Image from "next/image";

async function UserIcon() {
  const profileImg = await getProfileImg();
  if (profileImg) {
    return (
      <Image
        src={profileImg}
        alt="profile image"
        className="w-6 h-6 object-cover rounded-full"
        width={24}
        height={24}
      />
    );
  }
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full" />;
}

export default UserIcon;
