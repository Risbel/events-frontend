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

const NavbarDisco = ({ discoData, myPermissions }: { discoData: DataDisco; myPermissions: ImyPermissions }) => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session, status } = useSession();
  const { cartItems } = useCart();
  const { havePermission } = useHavePermissions(myPermissions);

  return (
    <div className="fixed z-50">
      <div
        style={{ backgroundColor: `${discoData.discoDetail.discoColor.brandColor}99` }}
        className={cn("flex w-screen h-14 absolute z-30 border-b backdrop-blur-2xl")}
      />
      <div className="flex justify-between items-center w-screen absolute z-40 px-2 md:px-6 py-2">
        <Link href={`/event/${discoData.slug}`} className="group flex gap-2 items-center cursor-pointer">
          <Image
            className="rounded-full  group-hover:scale-105"
            src={`${discoData.logo}`}
            alt="tickets logo"
            width={40}
            height={40}
          />
          <p style={{ color: "white" }} className="font-semibold">
            {discoData.name.toUpperCase()}
          </p>
        </Link>

        <div className="flex gap-2 items-center">
          <Image
            className="hover:scale-110 transition-transform cursor-pointer"
            src={"/bell.svg"}
            alt="bell notification"
            width={18}
            height={18}
          />
          <Link href={`/event/${slug}/cart`} className="relative rounded-full">
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
          <div className="flex justify-center">
            {status === "loading" ? (
              <Skeleton className="relative z-0 rounded-full items-center w-8 h-8"></Skeleton>
            ) : (
              session && <DropdownNavbar discoData={discoData} session={session} />
            )}
          </div>
          {havePermission("read", "Admin settings on disco") && <AdminSettings disco={discoData} />}
        </div>
      </div>
    </div>
  );
};

export default NavbarDisco;
