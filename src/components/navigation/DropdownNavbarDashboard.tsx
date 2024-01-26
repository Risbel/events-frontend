import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

import { Session } from "next-auth";
import Logout from "../buttons/Logout";
import Image from "next/image";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

const DropdownNavbarDashboard = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          {!session.user?.image ? (
            <Image
              className="hover:scale-110 transition-transform"
              src={"/avatar-icon.svg"}
              alt="avatar icon"
              width={25}
              height={25}
            />
          ) : (
            <div className="flex items-center rounded-full overflow-hidden relative z-20">
              <AvatarImage className="h-10 w-10" src={session.user.image} />
              <AvatarFallback className="h-10 w-10" />
            </div>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="translate-y-4 md:-translate-x-4 w-screen md:w-80">
        <DropdownMenuLabel className="flex items-center gap-4">
          <Avatar>
            <AvatarImage className="h-20 w-20 rounded-full" src={session.user.image} />
            <AvatarFallback className="h-20 w-20" />
          </Avatar>
          <div className="flex flex-col">
            <span>{session.user.name}</span>
            <span>{session.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href={"/dashboard/settings-account"} className="flex justify-between w-full">
            Settings
            <Settings className="h-4 w-4" />
          </Link>{" "}
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="focus:bg-white">
          <Button className="w-full">Upgrade to Pro</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavbarDashboard;
