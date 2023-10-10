import httpService from "@/config/axios.config";

const getResourcesByPermissionId = async (
  discoRoleId: string,
  permissionId: string
): Promise<ResourcesByPermissionId[]> => {
  try {
    const response = await httpService.get(`/rolesPermissionsResources/resources/${discoRoleId}/${permissionId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export default getResourcesByPermissionId;

export interface ResourcesByPermissionId {
  id: string;
  createdAt: string;
  updatedAt: string;
  discoRoleId: string;
  permissionId: string;
  resourceId: string;
  Resource: Resource;
}

export interface Resource {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
