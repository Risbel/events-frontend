import httpService from "@/config/axios.config";

export const deleteRolePermissionResource = async (id: string) => {
  try {
    const response = await httpService.delete(`rolesPermissionsResources/${id}`);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};
