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

import Logout from "../buttons/Logout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useGetDisco from "@/hooks/useGetDisco";
import { UserCircle2 } from "lucide-react";

const DropdownNavbar = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });

  if (!session || !discoData) {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          {!session.user?.image ? (
            <UserCircle2
              className="hover:scale-105"
              height={30}
              width={30}
              stroke={`${discoData.disco.discoDetail.discoColor.navbarForeground}`}
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
        style={{
          background: `${discoData?.disco.discoDetail.discoColor.bgNavbarColor}99`,
          color: `${discoData.disco.discoDetail.discoColor.navbarForeground}`,
          border: `2px solid ${discoData.disco.discoDetail.discoColor.navbarForeground}`,
        }}
        className="backdrop-blur-xl w-80 pb-4 translate-y-3 -translate-x-6 rounded-r-none"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator
          style={{ border: `0.5px solid ${discoData.disco.discoDetail.discoColor.navbarForeground}` }}
        />

        <DropdownMenuItem>
          <Link href={`/event/${slug}/profile`} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/event/${slug}/reservations`} className="w-full">
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
