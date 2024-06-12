import AddPermissionButton from "@/components/buttons/AddPermissionButton";
import AddRoleButton from "@/components/buttons/AddRoleButton";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PermissionsByDiscoRole from "@/components/dashboard/permissions/PermissionsByDiscoRole";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDiscoBySlug } from "@/hooks/useGetDiscoBySlug";
import useGetMe from "@/hooks/useGetMe";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

const DiscoPerssions = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { isLoading: isLoadingMy, user } = useGetMe();
  const { isLoading, data } = useGetDiscoBySlug(slug);

  if (isLoadingMy || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex pt-24 justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="pt-24 px-6">
        <div className="flex items-center gap-4 rounded-full bg-gradient-to-r from-primary/30 via-transparent to-transparent">
          <Avatar className="rounded-full overflow-hidden h-10 w-10">
            <AvatarImage height={40} width={40} src={data?.logo} />
          </Avatar>
          <h1 className="text-primary text-xl font-semibold">{data?.name}</h1>
        </div>

        <div className="flex gap-4 py-4">
          <div className="px-2">
            <h2 className="text-primary text-lg font-semibold">Roles</h2>
            {data?.DiscoRoles.map((rol) => (
              <div key={rol.id}>
                <span className="text-primary">{rol.name}</span>
              </div>
            ))}
          </div>
          <div>{data && <AddRoleButton discoId={data?.id} />}</div>
        </div>
      </div>

      <div className="overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-secondary">
              <TableHead className="w-[120px] text-primary">Roles</TableHead>
              <TableHead className="text-primary">Permissions on resources</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.DiscoRoles.map((role) => (
              <TableRow className="hover:bg-secondary/50 items-center" key={role.id}>
                <TableCell className="text-primary py-2">{role.name}</TableCell>
                <TableCell className="text-primary py-2">
                  <div className="flex gap-36 md:gap-x-44 pb-2">
                    <AddPermissionButton roleId={role.id} />
                  </div>
                  <div>
                    <PermissionsByDiscoRole rolePermissionsResources={role.rolePermissionResouces} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default DiscoPerssions;
