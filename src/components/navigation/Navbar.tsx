import Link from "next/link";
import DropdownNavbar from "./DropdownNavbar";

import SuperAdminSettings from "./SuperAdminSettings";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="fixed z-50">
      <div className="flex w-screen  h-14 absolute z-30 backdrop-blur-xl bg-black/30  blur-md"></div>
      <div className="flex justify-between items-center w-screen absolute z-40 px-4 py-2 border-b-[0.1px]">
        <Link href={"/"} className="text-white font-semibold shadow-lg hover:shadow-blue-500/50">
          C-TONIGHT
        </Link>
        <div>
          <SuperAdminSettings />
        </div>
        <div className="flex justify-center md:pr-5 lg:pr-10">
          {status === "loading" ? (
            <Skeleton className="relative z-0 rounded-full items-center w-10 h-10"></Skeleton>
          ) : (
            session && <DropdownNavbar session={session} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
