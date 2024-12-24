"use client";

import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { toggleFavorite } from "@/utils/actions";
import { CardButton } from "../form/FormButton";

type FavoriteContainerProps = {
  itemId: string;
  favoriteId: string | null;
};

function FavoriteContainer({ itemId, favoriteId }: FavoriteContainerProps) {
  const currentPathname = usePathname();
  const toggle = toggleFavorite.bind(null, {
    itemId,
    favoriteId,
    currentPathname,
  });

  return (
    <FormContainer action={toggle}>
      <CardButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}

export default FavoriteContainer;
