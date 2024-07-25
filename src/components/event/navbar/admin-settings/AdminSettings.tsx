import { DataDisco } from "@/services/getDisco";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BarChartBig, Settings2, WalletCards } from "lucide-react";

import AddBannerImages from "./banner-images";
import AddCarouselImages from "./carousel-images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddCombos from "./combos";
import Notifications from "./notifications";
import Share from "./share";

const AdminSettings = ({ disco }: { disco: DataDisco }) => {
  const { slug } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <Settings2
          stroke={`${disco.discoDetail.discoColor.navbarForeground}`}
          className="hover:scale-105 cursor-pointer transition-transform"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          background: `${disco.discoDetail.discoColor.bgNavbarColor}99`,
          color: `${disco.discoDetail.discoColor.navbarForeground}`,
          border: `2px solid ${disco.discoDetail.discoColor.navbarForeground}`,
        }}
        className="backdrop-blur-xl w-80 pb-4 translate-y-5 -translate-x-6 rounded-r-none "
      >
        <DropdownMenuLabel>Admin settings</DropdownMenuLabel>
        <DropdownMenuSeparator style={{ border: `0.5px solid ${disco.discoDetail.discoColor.navbarForeground}` }} />

        <DropdownMenuItem className="transition-colors">
          <Link className="flex gap-2" href={`/event/${slug}/my-sales/today`}>
            <WalletCards width={20} hanging={20} /> My sales
          </Link>
        </DropdownMenuItem>
        <AddBannerImages discoDetail={disco.discoDetail} />
        <AddCarouselImages discoDetail={disco.discoDetail} />
        <AddCombos discoId={disco.id} />
        <Notifications discoId={disco.id} />
        <Share disco={disco} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminSettings;
