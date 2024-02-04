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

import { useRouter } from "next/router";
import { BellIcon, ShoppingCart } from "lucide-react";
import useGetDisco from "@/hooks/useGetDisco";
import useGetMyPermissions from "@/hooks/useGetMyPermissions";
import AdminSettings from "../event/AdminSettings";

const NavbarEvent = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const { cartItems } = useCart();

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });
  const discoId = discoData?.disco?.id;

  const { data: myPermissions } = useGetMyPermissions(userId, discoId);
  const { havePermission } = useHavePermissions(myPermissions);

  if (!discoData) {
    return;
  }

  return (
    <div className="fixed z-50">
      <div
        style={{
          backgroundColor: `${discoData.disco.discoDetail.discoColor.bgNavbarColor}`,
          borderBottom: `2px solid ${discoData.disco.discoDetail.discoColor.navbarForeground}`,
        }}
        className={cn("flex w-screen h-14 absolute z-30 backdrop-blur-2xl")}
      />
      <div className="flex justify-between items-center w-screen absolute z-40 px-2 md:pl-6 md:pr-8 py-2">
        <Link href={`/event/${discoData.disco.slug}`} className="group flex gap-2 items-center cursor-pointer">
          <Image
            className="rounded-full  group-hover:scale-105"
            src={`${discoData.disco.logo}`}
            alt="tickets logo"
            width={40}
            height={40}
          />
          <p style={{ color: `${discoData.disco.discoDetail.discoColor.navbarForeground}` }} className="font-semibold">
            {discoData.disco.name.toUpperCase()}
          </p>
        </Link>

        <div className="flex gap-2 md:gap-4 items-center">
          <BellIcon
            style={{ stroke: `${discoData.disco.discoDetail.discoColor.navbarForeground}` }}
            className="cursor-pointer hover:scale-110 transition-transform"
          />

          <Link href={`/event/${slug}/cart`} className="relative rounded-full">
            <ShoppingCart
              style={{ stroke: `${discoData.disco.discoDetail.discoColor.navbarForeground}` }}
              className="cursor-pointer hover:scale-110 transition-transform"
            />

            {Number(cartItems.length) >= 1 && (
              <div
                style={{
                  background: `${discoData.disco.discoDetail.discoColor.navbarForeground}`,
                  color: `${discoData.disco.discoDetail.discoColor.bgNavbarColor}`,
                }}
                className="absolute translate-x-1 h-4 w-4 top-0 right-0 rounded-full font-semibold text-center text-xs"
              >
                {cartItems.length}
              </div>
            )}
          </Link>
          <div className="flex justify-center">
            <DropdownNavbar />
          </div>
          {<AdminSettings disco={discoData.disco} />}
        </div>
      </div>
    </div>
  );
};

export default NavbarEvent;
