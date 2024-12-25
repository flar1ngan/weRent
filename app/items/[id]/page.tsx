import FavoriteButton from "@/components/card/FavoriteButton";
import ItemRating from "@/components/card/ItemRating";
import Breadcrumbs from "@/components/items/Breadcrumbs";
import ImageContainer from "@/components/items/ImageContainer";
import UserInfo from "@/components/items/UserInfo";
import { Separator } from "@/components/ui/separator";
import { getItemDetails, checkExistingReview } from "@/utils/actions";
import Description from "@/components/items/Description";
import { redirect } from "next/navigation";
import SubmitReview from "@/components/reviews/SubmitReview";
import ReviewList from "@/components/reviews/ReviewList";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

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

  const { userId } = auth();
  const isNotOwner = item.profile.clerkId !== userId;
  const reviewMissing =
    userId && isNotOwner && !(await checkExistingReview(userId, item.id));

  return (
    <section>
      <Breadcrumbs name={item.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{item.name}</h1>
        <FavoriteButton itemId={item.id} />
      </header>
      <ImageContainer image={item.image} name={item.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{item.name}</h1>
            <ItemRating inPage itemId={item.id} />
          </div>
          <UserInfo profile={{ firstName, profileImg }} />
          <Separator className="mt-4" />
          <Description description={item.description} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <DynamicRentWrapper
            itemId={item.id}
            price={item.price}
            rents={item.rents}
          />
        </div>
      </section>
      {reviewMissing && <SubmitReview itemId={item.id} />}
      <ReviewList itemId={item.id} />
    </section>
  );
}

export default ItemPage;
