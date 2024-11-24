import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

function Logo() {
  return (
    <>
      <Button variant="ghost" asChild>
      <Link href="/">
        <Image src="/weRent.svg" alt="logo" width="96" height="96" />
      </Link>
      </Button>
    </>
  );
}

export default Logo;
