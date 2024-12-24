"use client"
import { deleteReview } from "@/utils/actions"
import { IconButton } from "../form/FormButton"
import FormContainer from "../form/FormContainer"
import { usePathname } from "next/navigation"

function DeleteReview({reviewId}: {reviewId:string}) {
    const currentPathname = usePathname();
    const deleteReviewAction = deleteReview.bind(null, {reviewId, currentPathname})
  return <FormContainer action={deleteReviewAction}>
    <IconButton actionType="delete" />
  </FormContainer>
}

export default DeleteReview