import { cn } from "@/lib/shadcnUtils";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";
import { BellIcon, Home, ShoppingCart, UserCircle2 } from "lucide-react";
import Image from "next/image";

const NavbarPreview = ({ values }: { values: any }) => {
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
            <a href="#1" className="group flex gap-2 items-center cursor-pointer">
              <Image
                className="rounded-full group-hover:scale-105 object-cover"
                src={
                  values?.logo && values?.logo?.[0]?.name ? URL.createObjectURL(values?.logo?.[0]) : "/img-random.png"
                }
                alt="logo"
                width={40}
                height={40}
              />
              <p className="font-semibold">{values.name}</p>
            </a>

            <nav className="hidden md:flex gap-4">
              <a href="#1">
                <Home className="cursor-pointer hover:-translate-y-0.5 transition-transform" height={22} />
              </a>

              <a href="#2" className="cursor-pointer hover:-translate-y-0.5 transition-transform">
                About
              </a>

              <a href="#3" className="cursor-pointer hover:-translate-y-0.5 transition-transform">
                Experiencies
              </a>

              <a href="#4" className="cursor-pointer hover:-translate-y-0.5 transition-transform">
                Tickets
              </a>

              <a href="#5" className="cursor-pointer hover:-translate-y-0.5 transition-transform">
                Contact
              </a>
            </nav>

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
