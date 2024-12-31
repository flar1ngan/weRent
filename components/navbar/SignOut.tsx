"use client"
import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

function SignOut() {
    const {toast} = useToast();
    const handleLogout = () =>{
        toast({description:"Jūs esat izrakstījies"})
    };

  return <SignOutButton redirectUrl="/">
    <button className="w-full text-left" onClick={handleLogout}>
        Izrakstīties no konta
    </button>
  </SignOutButton>
}

export default SignOut