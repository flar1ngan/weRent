import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {auth} from "@clerk/nextjs/server"

import Link from "next/link";
import { Button } from "../ui/button";
import UserIcon from "./UserIcon";
import { links } from "@/utils/links";
import SignOut from "./SignOut";
import { SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs";

function LinksDropdown() {
  const {userId} = auth()
  const isAdmin = userId === process.env.ADMIN_USER_ID
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className='h-10 w-10 p-0'>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Pierakstīties</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Reģistrēties</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
        {links.map((link) => {
          if(link.label==="Admin" && !isAdmin) return null;
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="w-full capitalize">
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
