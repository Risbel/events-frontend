import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/shadcnUtils";
import ButtonStart from "@/pages/components/ButtonStart";

const NavbarLanding = () => {
  return (
    <div className="fixed z-50">
      <div className="flex w-screen h-16 absolute z-30 bg-primary/95 backdrop-blur-md border-b border-silverdark" />
      <div className="flex justify-between w-screen absolute z-40 pl-4 h-16">
        <Link href={"/"} className="flex gap-2 items-center text-white font-semibold">
          <Image src={"/tickets-logo.svg"} alt="tickets logo" width={35} height={35} />
          MyEvents
        </Link>

        <div className="hidden md:flex items-center gap-6 translate-x-20">
          <Link href={"/#"} className="text-lg text-primary-foreground/80 hover:text-white">
            About
          </Link>
          <Link href={"/#"} className="text-lg text-primary-foreground/80 hover:text-white">
            Services
          </Link>
          <Link href={"/#"} className="text-lg text-primary-foreground/80 hover:text-white">
            Contact
          </Link>
          <Link href={"/#"} className="text-lg text-primary-foreground/80 hover:text-white">
            FAQ
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 px-8">
          <Link href={"/auth/login"} className={cn(buttonVariants({ variant: "outline" }))}>
            Login
          </Link>
          <ButtonStart />
        </div>
      </div>
    </div>
  );
};

export default NavbarLanding;
