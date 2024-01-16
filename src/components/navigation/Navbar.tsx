import Link from "next/link";
import DropdownNavbar from "./DropdownNavbar";

import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import useCart from "@/store/useCart";

function Navbar() {
  const { data: session, status } = useSession();
  const { cartItems } = useCart();

  return (
    <div className="fixed z-50">
      <div className="flex w-screen h-12 absolute z-30 bg-gray-700" />
      <div className="flex justify-between items-center w-screen absolute z-40 pl-4 py-2">
        <div className="flex gap-2 items-center">
          <Image src={"/tickets-logo.svg"} alt="tickets logo" width={30} height={30} />
          <p className="text-white font-semibold">MyEvents</p>
        </div>

        <div className="flex gap-2">
          {/* <Link href={"/cart"} className="relative  rounded-full">
            <Image
              className="hover:scale-110 transition-transform"
              src={"/shopping-cart.png"}
              alt="shop cart"
              width={30}
              height={30}
            />
            {Number(cartItems.length) >= 1 && (
              <div className="absolute translate-x-3 -translate-y-1 h-4 w-4 top-0 right-0 rounded-full bg-white font-semibold text-center text-xs">
                {cartItems.length}
              </div>
            )}
          </Link> */}
          <div className="flex justify-center md:pr-5 lg:pr-10">
            {status === "loading" ? (
              <Skeleton className="relative z-0 rounded-full items-center w-8 h-8"></Skeleton>
            ) : (
              session && <DropdownNavbar session={session} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
