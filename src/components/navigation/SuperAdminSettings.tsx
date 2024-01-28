import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useGetMe from "@/hooks/useGetMe";

const SuperAdminSettings = () => {
  const { user, isLoading } = useGetMe();

  if (isLoading) {
    return null;
  }

  if (user?.email !== "risbel961019@gmail.com") {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <span className="text-white text-sm px-2 pb-2 pt-1 flex  hover:bg-black rounded-sm ">Super Admin</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="backdrop-blur-sm bg-black/50 text-white">
        <DropdownMenuLabel className="bg-blue-700/40">Admin Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/admin-settings/add-discos"}>
          <DropdownMenuItem>Add discos</DropdownMenuItem>
        </Link>
        <Link href={"/admin-settings/users"}>
          <DropdownMenuItem>Users</DropdownMenuItem>
        </Link>
        <Link href={"/admin-settings/permissions"}>
          <DropdownMenuItem>Permissions</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SuperAdminSettings;
