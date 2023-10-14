import Link from "next/link";
import DropdownNavbar from "./DropdownNavbar";

import SuperAdminSettings from "./SuperAdminSettings";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="fixed z-50">
      <div className="flex w-screen  h-14 absolute z-30 backdrop-sepia-0 bg-white/10 blur-md"></div>
      <div className="flex justify-between items-center w-screen absolute z-40 px-4 py-2 border-b-[0.1px]">
        <Link href={"/"} className="text-white font-semibold shadow-lg hover:shadow-blue-500/50">
          CFG-TONIGHT
        </Link>
        <div>
          <SuperAdminSettings />
        </div>
        <div className="flex justify-center md:pr-5 lg:pr-10">
          {status !== "loading" && session && <DropdownNavbar session={session} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
