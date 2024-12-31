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
  const [isAnimating, setAnimating] = useState(false);

  const handleToggle = () => {
    if (isUpdateForm) {
      setAnimating(true);
      setTimeout(() => {
        setUpdateForm(false);
        setAnimating(false);
      }, 300);
    } else {
      setUpdateForm(true);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 items-center">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="object-cover rounded w-24 h-24 mb-2 mr-1"
        />
        <Button variant="outline" size="sm" onClick={handleToggle}>
          {text}
        </Button>
      </div>
      {(isUpdateForm || isAnimating) && (
        <div
          className={`max-w-lg mt-4 ${
            isAnimating ? "animate-pop-out" : "animate-slide-in-up"
          }`}
        >
          <FormContainer action={action}>
            {props.children}
            <FormImage />
            <div className="flex justify-end mt-2">
              <SubmitButton size="sm" className="" />
            </div>
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default FormImageContainer;
