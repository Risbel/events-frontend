import { ImyPermissions, IrolePermissionResouce } from "@/services/getMyPermissionsOnDisco";
//hook to check if any user has certain permissions for certain resources
export const useHavePermissions = (myPermissions: ImyPermissions) => {
  const havePermission = (permission: Ipermission, resource: Iresource) => {
    const isPermission =
      myPermissions &&
      myPermissions.DiscoRole.rolePermissionResouces.find(
        (permisionResource: IrolePermissionResouce) =>
          permisionResource?.Permission?.name === permission && permisionResource?.Resource?.name === resource
      );

    return isPermission;
  };

  return { havePermission };
};

export default useHavePermissions;

type Ipermission = "create" | "read" | "update" | "delete";
type Iresource = "Disco Admissions" | "Admin settings on disco" | "Discos" | "Users " | "Disco Images" | "Tickets";
