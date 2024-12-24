"use client";
import { useState } from "react";
import { actionFunction } from "@/utils/types";
import Image from "next/image";
import FormContainer from "./FormContainer";
import FormImage from "./FormImage";
import { Button } from "../ui/button";
import { SubmitButton } from "./FormButton";

type FormImageContainerProps = {
  name: string;
  text: string;
  image: string;
  action: actionFunction;
  children?: React.ReactNode;
};

function FormImageContainer(props: FormImageContainerProps) {
  const { name, text, image, action } = props;
  const [isUpdateForm, setUpdateForm] = useState(false);
  return (
    <div>
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="object-cover rounded w-24 h-24 mb-2"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setUpdateForm((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateForm && (
        <div className='max-w-lg mt-4'>
          <FormContainer action={action}>
            {props.children}
            <FormImage />
            <SubmitButton size='sm' />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default FormImageContainer;
