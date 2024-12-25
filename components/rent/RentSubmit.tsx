"use client";

import { useItem } from "@/utils/store";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/FormButton";
import { createRent } from "@/utils/actions";

function RentSubmit() {
  const { userId } = useAuth();
  const { itemId, range } = useItem((state) => state);
  const startDate = range?.from as Date;
  const endDate = range?.to as Date;
  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button type="button" className="w-full">
          Pieslēgties lai pabeigtu rezervāciju
        </Button>
      </SignInButton>
    );
  }

  const createRentAction = createRent.bind(null, { itemId, startDate, endDate });
  return (
    <section>
      <FormContainer action={createRentAction}>
        <SubmitButton text="Rezervēt" className="w-full" />
      </FormContainer>
    </section>
  );
}

export default RentSubmit;
