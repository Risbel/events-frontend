import httpService from "@/config/axios.config";

const getPermissionsByDiscoRole = async (roleId: string): Promise<PermissionsByDiscoRoles[]> => {
  try {
    const response = await httpService.get(`/rolesPermissionsResources/permissions/${roleId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export default getPermissionsByDiscoRole;

export interface PermissionsByDiscoRoles {
  name: string;
  permissionId: string;
}
