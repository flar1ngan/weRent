import { Card, CardContent, CardHeader } from "../ui/card";
import Rating from "./Rating";
import Comment from "./Comment";
import { checkAuthor } from "@/utils/actions";
import DeleteReview from "./DeleteReview";
import Link from "next/link";

type ReviewCardType = {
  reviewDetails: {
    id: string;
    comment: string;
    rating: number;
    firstName: string;
    lastName: string;
    username: string;
    profileImg: string;
  };
};

async function ReviewCard({ reviewDetails }: ReviewCardType) {
  const isAuthor = await checkAuthor(reviewDetails.id);
  return (
    <Card className="relative">
      <CardHeader>
        <Link href={`/profile/${reviewDetails.username}`}>
          <div className="flex items-center">
            <img
              src={reviewDetails.profileImg}
              alt="profile"
              className="object-cover w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-sm font-semibold mb-1">
                {reviewDetails.firstName + " " + reviewDetails.lastName} 
              </h3>
              <Rating rating={reviewDetails.rating} />
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewDetails.comment} />
      </CardContent>
      {isAuthor ? (
        <div className="absolute top-3 right-3">
          <DeleteReview reviewId={reviewDetails.id} />
        </div>
      ) : null}
    </Card>
  );
}

export default ReviewCard;
