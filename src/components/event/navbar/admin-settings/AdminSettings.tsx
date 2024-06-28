import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { DataDisco } from "@/services/getDisco";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Settings2 } from "lucide-react";
import AddBannerImages from "./AddBannerImages";
import AddCombos from "./AddCombos";
import AddCarouselImages from "./AddCarouselImages";

const AdminSettings = ({ disco }: { disco: DataDisco }) => {
  const { slug } = useParams();

  return (
    <div>
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
            <Link href={`/event/${slug}/my-sales/today`}>My sales</Link>
          </DropdownMenuItem>
          <AddBannerImages discoDetail={disco.discoDetail} />
          <AddCarouselImages discoDetail={disco.discoDetail} />
          <AddCombos disco={disco} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminSettings;
