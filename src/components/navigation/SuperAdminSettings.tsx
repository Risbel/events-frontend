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
      <DropdownMenuTrigger>
        <span className="text-white text-xs p-2 bg-blue-900 hover:bg-blue-800 rounded-md">Super Admin</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="backdrop-blur-sm bg-black/50 text-white">
        <DropdownMenuLabel>Admin Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/admin-settings/add-discos"}>
          <DropdownMenuItem>Discos</DropdownMenuItem>
        </Link>
        <Link href={"/admin-settings/permissions"}>
          <DropdownMenuItem>Permissions</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SuperAdminSettings;
