import FavoriteButton from "@/components/card/FavoriteButton";
import ItemRating from "@/components/card/ItemRating";
import Breadcrumbs from "@/components/items/Breadcrumbs";
import ImageContainer from "@/components/items/ImageContainer";
import UserInfo from "@/components/items/UserInfo";
import { Separator } from "@/components/ui/separator";
import {
  getItemDetails,
  checkExistingReview,
  getProfile,
} from "@/utils/actions";
import Description from "@/components/items/Description";
import { redirect } from "next/navigation";
import ReviewList from "@/components/reviews/ReviewList";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DynamicRentWrapper = dynamic(
  () => import("@/components/rent/RentWrapper"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[200px] w-full" />,
  }
);

async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItemDetails(params.id);
  if (!item) redirect("/");
  const firstName = item.profile.firstName;
  const profileImg = item.profile.profileImg;
  const username = item.profile.username;
  const lastName = item.profile.lastName;

  const { userId } = auth();
  const user = await getProfile();
  console.log(user.username);
  const isNotOwner = item.profile.clerkId !== userId;
  const reviewMissing =
    userId && isNotOwner && !(await checkExistingReview(userId, item.id));

  return (
    <section>
      <Breadcrumbs name={item.name} />
      <div className="grid lg:grid-cols-2 gap-x-10">
        <ImageContainer image={item.image} name={item.name} />
        <div className="gap-x-12 mt-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{item.name}</h1>
            <div className="flex gap-2">

            <ItemRating inPage itemId={item.id} />
              <FavoriteButton itemId={item.id}  />
            </div>
            <p className="font-semibold mt-4 mb-2">Publicētājs</p>
            <div className="grid grid-cols-2 gap-x-12 items-center">
              <UserInfo
                profile={{ username, firstName, profileImg, lastName }}
              />
              {user.username !== username && (
                <Link href={`/chat/${username}`}>
                  <Button variant="default" size="lg" className="w-full">
                    Sazināties
                  </Button>
                </Link>
              )}
            </div>
            <Separator className="mt-4" />
            <Description description={item.description} />
          </div>
          <div className="grid sm:grid-cols-2 items-center">
            <DynamicRentWrapper
              itemId={item.id}
              price={item.price}
              rents={item.rents}
            />
          </div>
        </div>
      </div>
      <Separator className="mt-6"/>  
      <ReviewList itemId={item.id} reviewMissing={reviewMissing} />
    </section>
  );
}

export default ItemPage;
