import useGetPermissionsByDiscoRole from "@/hooks/useGetPermissionsByDiscoRole";
import AddPermissionButton from "../buttons/AddPermissionButton";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import Resources from "./Resources";
import { IrolePermissionResouces } from "@/services/getDiscoBySlug";

const PermissionsByDiscoRole = ({
  rolePermissionsResources,
}: {
  rolePermissionsResources: IrolePermissionResouces[];
}) => {
  const allPermissions: IallPermissions[] = rolePermissionsResources.map((rolePermissionResource) => {
    return {
      permissionId: rolePermissionResource.Permission.id,
      name: rolePermissionResource.Permission.name,
      roleId: rolePermissionResource.discoRoleId,
    };
  });

  const permissions: IPermissions[] = allPermissions.reduce((acc: IallPermissions[], permission) => {
    const isDuplicate = acc.some(
      (item) => item.permissionId === permission.permissionId && item.name === permission.name
    );
    if (!isDuplicate) {
      acc.push(permission);
    }

    return acc;
  }, []);

  return (
    <div>
      {permissions.map((permission) => (
        <div key={permission.name}>
          <Table>
            <TableBody>
              <TableRow className="hover:bg-primary-foreground">
                <TableCell className="w-48 py-1">{permission.name}</TableCell>
                <TableCell className="flex gap-2 py-1">
                  <Resources discoRoleId={permission.roleId} permissionId={permission.permissionId} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default PermissionsByDiscoRole;

interface IallPermissions {
  permissionId: string;
  name: string;
  roleId: string;
}
interface IPermissions {
  permissionId: string;
  name: string;
  roleId: string;
}
