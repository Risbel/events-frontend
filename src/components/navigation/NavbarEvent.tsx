import Link from "next/link";
import DropdownNavbar from "./DropdownNavbar";

import { useSession } from "next-auth/react";
import Image from "next/image";
import useCart from "@/store/useCart";
import { cn } from "@/lib/shadcnUtils";
import useHavePermissions from "@/utils/useHavePermissions";

import { useRouter } from "next/router";
import { BellIcon, Home, ShoppingCart } from "lucide-react";
import useGetDisco from "@/hooks/useGetDisco";
import useGetMyPermissions from "@/hooks/useGetMyPermissions";
import AdminSettings from "../event/AdminSettings";
import useHandleScroll from "@/hooks/useHandlerScroll";
import { usePathname } from "next/navigation";
import SubscribeButton from "../buttons/SubscribeButton";
import SubscribeNow from "../event/SubscribeNow";

const NavbarEvent = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;
  const path = usePathname();

  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const { cartItems } = useCart();

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });
  const discoId = discoData?.disco?.id;

  const { data: myPermissions } = useGetMyPermissions(userId, discoId);
  const { havePermission } = useHavePermissions(myPermissions);

  const handleClickScroll = useHandleScroll();

  if (!discoData) {
    return;
  }

  return (
    <div className="fixed z-[100]">
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
            {discoData.disco.name}
          </p>
        </Link>

        {path === "/event/" + slug && ( //condition to show just on /event page instead all subpages
          <div
            style={{ color: `${discoData.disco.discoDetail.discoColor.navbarForeground}` }}
            className="hidden md:flex gap-4"
          >
            <a
              className="font-semibold hover:opacity-80"
              onClick={(event) => handleClickScroll(event, "#hero")}
              href={"#hero"}
            >
              <Home height={22} />
            </a>
            <a
              className="font-semibold hover:opacity-80"
              onClick={(event) => handleClickScroll(event, "#about")}
              href={"#about"}
            >
              About
            </a>
            <a
              className="font-semibold hover:opacity-80"
              onClick={(event) => handleClickScroll(event, "#experiences")}
              href={"#experiences"}
            >
              Experiencies
            </a>
            <a
              className="font-semibold hover:opacity-80"
              onClick={(event) => handleClickScroll(event, "#contact")}
              href={"#contact"}
            >
              Contact
            </a>
            <a
              className="font-semibold hover:opacity-80"
              onClick={(event) => handleClickScroll(event, "#FAQ")}
              href={"#FAQ"}
            >
              FAQ
            </a>
          </div>
        )}

        <div className="flex gap-2 md:gap-4 items-center">
          {userId && !discoData.subscription ? (
            <SubscribeNow
              discoColors={discoData.disco.discoDetail.discoColor}
              userId={userId}
              discoId={discoData.disco.id}
            />
          ) : (
            <BellIcon
              style={{ stroke: `${discoData.disco.discoDetail.discoColor.navbarForeground}` }}
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          )}

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
          {!session && (
            <Link
              className="px-3 py-1 rounded-xl font-semibold"
              style={{
                background: `${discoData.disco.discoDetail.discoColor.navbarForeground}`,
                color: `${discoData.disco.discoDetail.discoColor.bgNavbarColor}`,
              }}
              href={`/auth/login/event/${slug}`}
            >
              Login
            </Link>
          )}

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
