import Resource405 from "@/components/alerts/Resource405";
import AddPermissionButton from "@/components/buttons/AddPermissionButton";
import AddRoleButton from "@/components/buttons/AddRoleButton";
import HomeLayout from "@/components/layouts/HomeLayout";
import BackToHome from "@/components/links/BackToHome";
import Spinner from "@/components/loaders/Spinner";
import PermissionsByDiscoRole from "@/components/permissions/PermissionsByDiscoRole";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDiscoBySlug } from "@/hooks/useGetDiscoBySlug";
import useGetMe from "@/hooks/useGetMe";
import { useRouter } from "next/router";

const DiscoPerssions = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { isLoading: isLoadingMy, user } = useGetMe();
  const { isLoading, data } = useGetDiscoBySlug(slug);

  if (isLoadingMy || isLoading) {
    return (
      <HomeLayout>
        <div className="flex pt-24 justify-center">
          <Spinner diameter={10} />
        </div>
      </HomeLayout>
    );
  }

  if (user) {
    if (user.email !== "risbel961019@gmail.com") {
      return (
        <div className="flex flex-col justify-center items-center gap-8 pt-24">
          <Resource405 text={"This resource is just reserved for admins"} />
          <BackToHome />
        </div>
      );
    }
  }

  return (
    <HomeLayout>
      <div className="pt-24 px-6 md:px-16">
        <div className="flex items-center gap-4 rounded-full bg-gradient-to-r from-blue-700/30 via-transparent to-transparent">
          <Avatar className="rounded-full overflow-hidden">
            <AvatarImage height={40} width={40} src={data?.logo} />
          </Avatar>
          <h1 className="text-white text-xl">{data?.name}</h1>
        </div>

        <div className="flex gap-4 py-4">
          <div className="px-2">
            <h2 className="text-white text-lg font-semibold">Roles</h2>
            {data?.DiscoRoles.map((rol) => (
              <div key={rol.id}>
                <span className="text-white">{rol.name}</span>
              </div>
            ))}
          </div>
          <div>{data && <AddRoleButton discoId={data?.id} />}</div>
        </div>
      </div>

      <div className="overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white/10">
              <TableHead className="w-[120px] text-white">Roles</TableHead>
              <TableHead className="text-white">Permissions on resources</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.DiscoRoles.map((role) => (
              <TableRow className="hover:bg-white/10" key={role.id}>
                <TableCell className="text-white py-2">{role.name}</TableCell>
                <TableCell className="text-white py-2">
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
    </HomeLayout>
  );
};

export default DiscoPerssions;
