import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DataDisco } from "@/services/getDisco";
import BankCardAsociated from "./BankCardAsociated";
import Link from "next/link";
import { useParams } from "next/navigation";

const AdminSettings = ({ disco }: { disco: DataDisco }) => {
  const { slug } = useParams();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <Image
            className="hover:scale-[115%] transition-transform duration-200"
            src={"/dots-3-vertical.svg"}
            width={22}
            height={22}
            alt="Picture of the author"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{
            background: `${disco.discoDetail.discoColor.bgNavbarColor}99`,
            color: `${disco.discoDetail.discoColor.navbarForeground}`,
          }}
          className="backdrop-blur-xl w-80 pb-4 translate-y-5 -translate-x-2 rounded-r-none "
        >
          <DropdownMenuLabel>Admin settings</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link href={`/event/${slug}/my-sales`}>My sales</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>My users</DropdownMenuItem>
          <DropdownMenuItem>Permissions</DropdownMenuItem>

          <BankCardAsociated discoDetailId={disco.discoDetail.id} discoBankCard={disco.discoDetail.userBankCard} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminSettings;
