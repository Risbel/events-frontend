import httpService from "@/config/axios.config";

const getMyPermissionsOnDisco = async (userId: string, discoId: string): Promise<ImyPermissions[] | any> => {
  const response = await httpService.get(`/subscription/role/permissions/${userId}/${discoId}`);
  return response.data;
};

export default getMyPermissionsOnDisco;

export interface ImyPermissions {
  id: string;
  DiscoRole: IdiscoRole;
}

export interface IdiscoRole {
  id: string;
  name: string;
  rolePermissionResouces: IrolePermissionResouce[];
}

export interface IrolePermissionResouce {
  permissionId: string;
  resourceId: string;
  Permission: IPermission;
  Resource: IResource;
}

export interface IPermission {
  name: string;
}
export interface IResource {
  name: string;
}
