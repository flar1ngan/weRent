"use client";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/FormButton";
import RatingInput from "../form/RatingInput";
import FormDescriptionInput from "../form/FormDescriptionInput";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { createReview } from "@/utils/actions";

function SubmitReview({ itemId }: { itemId: string }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAnimating, setAnimating] = useState(false);

  const handleToggle = () => {
    if (isFormVisible) {
      setAnimating(true);
      setTimeout(() => {
        setIsFormVisible(false);
        setAnimating(false);
      }, 300);
    } else {
      setIsFormVisible(true);
    }
  };

  return (
    <div className="mt-4">
      <div>
        <Button onClick={handleToggle}>
          {isFormVisible ? <p>Aizvērt</p> : <p>Atstāt atsauksmi</p>}
        </Button>
      </div>
      {(isFormVisible || isAnimating) && (
        <Card
          className={`mt-6 p-8 ${
            isAnimating ? "animate-pop-out" : "animate-slide-in-up"
          }`}
        >
          <FormContainer action={createReview}>
            <input type="hidden" name="itemId" value={itemId} />
            <RatingInput name="rating" labelText="Reitings" />
            <FormDescriptionInput
              name="comment"
              labelText="Jūsu pieredze ar šo priekšmetu"
              defaultValue=""
            />
            <SubmitButton text="Iesniegt" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
