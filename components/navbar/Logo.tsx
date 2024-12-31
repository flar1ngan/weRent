"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

function Logo() {
  const {theme} = useTheme()
  const logoSrc = theme === "dark" ? "/weRentDark.svg" : "/weRent.svg"

  return (
    <>
      <Button variant="ghost" asChild>
      <Link href="/">
        <Image src={logoSrc} alt="logo" width="96" height="96" />
      </Link>
      </Button>
    </>
  );
}

export default Logo;
