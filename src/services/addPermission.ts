import { AddPermissionsSchema } from "@/components/forms/AddPermissionForm";
import httpService from "@/config/axios.config";

const addPermission = async ({ roleId, permission, resource }: AddPermissionsSchema) => {
  try {
    const response = await httpService.post(`/rolesPermissionsResources/${roleId}`, { permission, resource });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export default addPermission;
