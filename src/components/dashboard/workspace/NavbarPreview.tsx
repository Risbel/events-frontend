import { cn } from "@/lib/shadcnUtils";
import { BellIcon, Home, ShoppingCart, UserCircle2 } from "lucide-react";
import Image from "next/image";

const NavbarPreview = ({ values }: any) => {
  return (
    <div className="fixed w-full md:w-3/4 lg:w-5/6 z-50">
      {values && (
        <div className="relative pt-14 w-full z-50">
          <div
            style={{ background: values.bgNavbarColor, borderBottom: `1px solid ${values.navbarForeground}` }}
            className={cn("w-full h-16 absolute z-30 backdrop-blur-2xl")}
          />
          <div
            style={{ color: values.navbarForeground }}
            className="flex justify-between items-center w-full absolute z-40 px-2 md:pl-6 md:pr-8 py-3"
          >
            <div className="group flex gap-2 items-center cursor-pointer">
              <Image
                className="rounded-full group-hover:scale-105 object-cover"
                src={`${values?.logo ? values.logo : "/"}`}
                alt="logo"
                width={40}
                height={40}
              />
              <p className="font-semibold">{values.name?.toUpperCase()}</p>
            </div>

            <div className="hidden md:flex gap-4">
              <Home className="cursor-pointer hover:-translate-y-0.5 transition-transform" height={22} />
              <p className="cursor-pointer hover:-translate-y-0.5 transition-transform">About</p>

              <p className="cursor-pointer hover:-translate-y-0.5 transition-transform">Experiencies</p>

              <p className="cursor-pointer hover:-translate-y-0.5 transition-transform">Contact</p>

              <p className="cursor-pointer hover:-translate-y-0.5 transition-transform">FAQ</p>
            </div>

            <div className="flex gap-2 md:gap-4 items-center">
              <BellIcon className="cursor-pointer hover:scale-110 transition-transform" />

              <ShoppingCart className="cursor-pointer hover:scale-110 transition-transform" />
              <UserCircle2 height={30} width={30} className="cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarPreview;
