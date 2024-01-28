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
        <DropdownMenuContent className="backdrop-blur-sm bg-black/70 text-white rounded-r-none">
          <DropdownMenuLabel className="bg-blue-500/20">Admin settings</DropdownMenuLabel>
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
