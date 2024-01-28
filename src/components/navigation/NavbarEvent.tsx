import Link from "next/link";
import DropdownNavbar from "./DropdownNavbar";

import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import useCart from "@/store/useCart";
import { cn } from "@/lib/shadcnUtils";
import { DataDisco } from "@/services/getDisco";
import useHavePermissions from "@/utils/useHavePermissions";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import AdminSettings from "../disco/AdminSettings";
import { useRouter } from "next/router";

const NavbarEvent = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session, status } = useSession();
  const { cartItems } = useCart();

  return (
    <div className="fixed z-50">
      <div className={cn("flex w-screen h-14 absolute z-30 border-b backdrop-blur-2xl bg-primary/90")} />
      <div className="flex justify-center items-center w-screen absolute z-40 px-2 md:px-6 py-2">
        <div className="flex gap-2 items-center">
          <Image
            className="hover:scale-110 transition-transform cursor-pointer"
            src={"/bell.svg"}
            alt="bell notification"
            width={18}
            height={18}
          />
          <Link href={`/disco/${slug}/cart`} className="relative rounded-full">
            <Image
              className="hover:scale-110 transition-transform"
              src={"/shop-cart.svg"}
              alt="shop cart"
              width={35}
              height={35}
            />
            {Number(cartItems.length) >= 1 && (
              <div className="absolute translate-x-1 h-4 w-4 top-0 right-0 rounded-full bg-white font-semibold text-center text-xs">
                {cartItems.length}
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarEvent;
