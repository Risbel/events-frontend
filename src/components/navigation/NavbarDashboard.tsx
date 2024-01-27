import Link from "next/link";

import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

import DropdownNavbarDashboard from "./DropdownNavbarDashboard";
import MenubarDashboard from "./MenubarDashboard";

const NavbarDashboard = () => {
  const { data: session, status } = useSession();

  return (
    <div className="fixed z-50">
      <div className="flex w-screen h-14 absolute z-30 bg-primary" />
      <div className="flex justify-between items-center w-screen absolute z-40 px-2 md:px-6 py-2">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex gap-2 items-center cursor-pointer">
            <Image src={"/tickets-logo.svg"} alt="tickets logo" width={35} height={35} />

            <span className="text-primary-foreground">MyEvents</span>
          </Link>
          <div className="hidden md:block">
            <MenubarDashboard />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Image
            className="hover:scale-110 transition-transform cursor-pointer"
            src={"/bell.svg"}
            alt="bell notification"
            width={18}
            height={18}
          />
          <Image
            className="hover:scale-110 transition-transform cursor-pointer border-none"
            src={"/megaphone.svg"}
            alt="megaphone icon"
            width={20}
            height={20}
          />

          <div className="border-r border-muted h-8"></div>

          <div className="flex justify-center">
            {status === "loading" ? (
              <Skeleton className="relative z-0 rounded-full items-center w-10 h-10"></Skeleton>
            ) : (
              session && <DropdownNavbarDashboard session={session} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
