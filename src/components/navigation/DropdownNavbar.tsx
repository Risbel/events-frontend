import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

import { Session } from "next-auth";
import Logout from "../buttons/Logout";
import SuperAdminSettings from "./SuperAdminSettings";
import Image from "next/image";
import { useRouter } from "next/router";
import { DataDisco } from "@/services/getDisco";

const DropdownNavbar = ({ session, discoData }: { session: Session; discoData: DataDisco }) => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
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
      <DropdownMenuContent
        style={{ background: `${discoData.discoDetail.discoColor.brandColor}999` }}
        className="backdrop-blur-xl bg-primary/80 w-80 pb-4 translate-y-2 -translate-x-2 text-white rounded-r-none "
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SuperAdminSettings />
        <DropdownMenuItem>
          <Link href={`/disco/${slug}/profile`} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/disco/${slug}/reservations`} className="w-full">
            Reservations
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavbar;
