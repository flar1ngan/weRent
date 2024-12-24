"use client"
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

type ButtonSize = "default" | "sm" | "lg";

type SubmitButtonProps = {
    className?: string;
    text?: string;
    size?: ButtonSize;
  };
  
export function SubmitButton({className="", text="submit", size="lg"}:SubmitButtonProps) {
    const {pending} = useFormStatus()

    return <Button type="submit" disabled={pending} className={`capitalize ${className}`} size={size}>
        {pending?<>
        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
        Lūdzu uzgaidiet...
        </>:text}
    </Button>
}

export const CardLoginButton = () =>{
    return <SignInButton mode="modal">
        <Button type='button' size="icon" variant="outline" className='p-2 cursor-pointer' asChild>
            <FaRegHeart />
        </Button>
    </SignInButton>
}

export const CardButton = ({isFavorite}:{isFavorite:boolean}) => {
    const {pending} = useFormStatus()
    return <Button type='submit' size="icon" variant="outline" className='p-2 cursor-pointer'>
        {pending?<ReloadIcon className='animate-spin'/> :isFavorite?<FaHeart /> : <FaRegHeart/>}
    </Button>
} 