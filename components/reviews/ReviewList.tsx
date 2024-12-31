import { getItemReviews } from "@/utils/actions";
import SectionName from "../items/SectionName";
import ReviewCard from "./ReviewCard";
import SubmitReview from "./SubmitReview";

async function ReviewList({ itemId, reviewMissing }: { itemId: string, reviewMissing?: boolean | null | string}) {
  const reviews = await getItemReviews(itemId);

  return (
    <div className="mt-8">
      <SectionName text={`Atsauksmes (${reviews.length})`} />
      {reviewMissing && <SubmitReview itemId={itemId} />}
      <div className="grid md:grid-cols-1 gap-2 mt-4">
        {reviews.map((review) => {
          const { comment, rating, id } = review;
          const { firstName, lastName, username, profileImg } = review.profile;
          const reviewDetails = {
            id,
            rating,
            comment,
            profileImg,
            firstName,
            lastName,
            username
          };
          return <ReviewCard key={review.id} reviewDetails={reviewDetails} />
        })}
      </div>
    </div>
  );
}

export default ReviewList;
