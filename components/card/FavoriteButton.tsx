import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardLoginButton } from "../form/FormButton";
import { getFavoriteId } from "@/utils/actions";
import FavoriteContainer from "./FavoriteContainer";

async function FavoriteButton({ itemId }: { itemId: string }) {
  const { userId } = auth();
  if (!userId) return <CardLoginButton />;
  const favoriteId = await getFavoriteId({ itemId });
  return (
    <FavoriteContainer favoriteId={favoriteId} itemId={itemId} />
  );
}

export default FavoriteButton;
