import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useGetDisco from "@/hooks/useGetDisco";
import { BellIcon } from "lucide-react";
import Notifications from "./Notifications";

const Dropdown = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });
  const eventId = discoData?.disco.id;

  if (!session || !discoData || !userId || !eventId) {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <BellIcon
          style={{ stroke: `${discoData.disco.discoDetail.discoColor.navbarForeground}` }}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          background: `${discoData?.disco.discoDetail.discoColor.bgNavbarColor}99`,
          color: `${discoData.disco.discoDetail.discoColor.navbarForeground}`,
          border: `2px solid ${discoData.disco.discoDetail.discoColor.navbarForeground}`,
        }}
        className="relative backdrop-blur-xl w-screen md:w-[500px] max-h-[88vh] pb-4 translate-y-4 md:translate-y-6 md:-translate-x-36 rounded-2xl md:rounded-tr-none"
      >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator
          style={{ border: `0.5px solid ${discoData.disco.discoDetail.discoColor.navbarForeground}` }}
        />
        <div className="max-h-[80vh] overflow-y-scroll">
          <Notifications eventId={eventId} userId={userId} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
