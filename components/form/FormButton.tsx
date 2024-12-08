"use client"
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

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