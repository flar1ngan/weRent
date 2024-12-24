import { checkAuthor, getItemReviews } from "@/utils/actions";
import SectionName from "../items/SectionName";
import ReviewCard from "./ReviewCard";
import DeleteReview from "./DeleteReview";

async function ReviewList({ itemId }: { itemId: string }) {
  const reviews = await getItemReviews(itemId);
  if (reviews.length < 1) return null;

  return (
    <div className="mt-8">
      <SectionName text="Atsauksmes" />
      <div className="grid md:grid-cols-1 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating, id } = review;
          const { firstName, profileImg } = review.profile;
          const reviewDetails = {
            id,
            rating,
            comment,
            profileImg,
            firstName,
          };
          return <ReviewCard key={review.id} reviewDetails={reviewDetails} />
        })}
      </div>
    </div>
  );
}

export default ReviewList;
