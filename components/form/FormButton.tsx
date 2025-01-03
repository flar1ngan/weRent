"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuTrash2, LuPenSquare, LuSendHorizonal } from "react-icons/lu";
import { redirect } from "next/navigation";

type ButtonSize = "default" | "sm" | "lg";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: ButtonSize;
};

export function SubmitButton({
  className = "",
  text = "Iesniegt",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={` ${className}`}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Lūdzu uzgaidiet...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export function MessageSubmitButton({
  className = "",
  size = "default",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={` ${className}`}
      size={size}
    >
      {pending ? (
          <ReloadIcon className="animate-spin" />
      ) : (
        <LuSendHorizonal />
      )}
    </Button>
  );
}

export const CardLoginButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="animate-spin" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

type actionType = "edit" | "delete";

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const showIcon = () => {
    if (actionType == "edit") return <LuPenSquare />;
    if ((actionType = "delete")) return <LuTrash2 />;
  };
  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <ReloadIcon className="animate-spin" /> : showIcon()}
    </Button>
  );
};

export const UpdateProfileButton = () => {
  return <Button variant="default" size="lg" onClick={()=>{
    redirect("/")
  }}>text</Button>
}
