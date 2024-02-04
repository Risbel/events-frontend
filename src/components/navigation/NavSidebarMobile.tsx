import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useHandleScroll from "@/hooks/useHandlerScroll";

import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const NavSidebarEventMobile = ({ disco }: any) => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;
  const path = usePathname();
  const handleClickScroll = useHandleScroll();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        style={{
          background: `${disco.discoDetail.discoColor.bgNavbarColor}99`,
          color: `${disco.discoDetail.discoColor.navbarForeground}`,
          border: `2px solid ${disco.discoDetail.discoColor.navbarForeground}`,
        }}
        className="outline-none p-1 bg-white rounded-md group"
      >
        <Menu />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        style={{
          background: `${disco.discoDetail.discoColor.bgNavbarColor}99`,
          color: `${disco.discoDetail.discoColor.navbarForeground}`,
          border: `2px solid ${disco.discoDetail.discoColor.navbarForeground}`,
        }}
        className="backdrop-blur-xl pb-4 w-52 translate-x-1"
      >
        <DropdownMenuLabel>Navigation </DropdownMenuLabel>
        <DropdownMenuSeparator style={{ border: `0.5px solid ${disco.discoDetail.discoColor.navbarForeground}` }} />
        {path === "/event/" + slug && (
          <DropdownMenuGroup
            asChild
            style={{ color: `${disco.discoDetail.discoColor.navbarForeground}` }}
            className="flex flex-col gap-2"
          >
            <>
              <DropdownMenuItem asChild>
                <Link
                  className="font-semibold hover:opacity-80"
                  onClick={(event) => handleClickScroll(event, "#hero")}
                  href={"#hero"}
                >
                  <Home height={22} />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="font-semibold hover:opacity-80"
                  onClick={(event) => handleClickScroll(event, "#about")}
                  href={"#about"}
                >
                  About
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="font-semibold hover:opacity-80"
                  onClick={(event) => handleClickScroll(event, "#experiences")}
                  href={"#experiences"}
                >
                  Experiencies
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="font-semibold hover:opacity-80"
                  onClick={(event) => handleClickScroll(event, "#contact")}
                  href={"#contact"}
                >
                  Contact
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="font-semibold hover:opacity-80"
                  onClick={(event) => handleClickScroll(event, "#FAQ")}
                  href={"#FAQ"}
                >
                  FAQ
                </Link>
              </DropdownMenuItem>
            </>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavSidebarEventMobile;
