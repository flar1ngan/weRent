"use client";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/FormButton";
import RatingInput from "../form/RatingInput";
import FormDescriptionInput from "../form/FormDescriptionInput";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { createReview } from "@/utils/actions";

function SubmitReview({itemId}:{itemId:string}) {
  const [isFormVisible, setIsFormVisible] = useState(false)

  return <div className="mt-8">
    <Button onClick={()=>setIsFormVisible((prev)=>!prev)}>
      Atstāt atsauksmi
    </Button>
    {
      isFormVisible && <Card className="mt-8 p-8">
        <FormContainer action={createReview}>
          <input type="hidden" name="itemId" value={itemId} />
          <RatingInput name="rating" labelText="Reitings" />
          <FormDescriptionInput name="comment" labelText="Jūsu pieredze ar šo priekšmetu" defaultValue="Amazing!!"/>
          <SubmitButton text="Submit" className="mt-4" />
        </FormContainer>
      </Card>
    }
  </div>
}

export default SubmitReview