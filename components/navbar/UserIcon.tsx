import { LuUser2 } from "react-icons/lu";
import { getProfileImg } from "@/utils/actions";

async function UserIcon() {
  const profileImg = await getProfileImg();
  if (profileImg) {
    return (
      <img
        src={profileImg}
        alt="profile image"
        className="w-6 h-6 object-cover rounded-full"
      />
    );
  }
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full" />;
}

export default UserIcon;
