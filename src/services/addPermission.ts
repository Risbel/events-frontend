import { AddPermissionsSchema } from "@/components/forms/AddPermissionForm";
import httpService from "@/config/axios.config";

const addPermission = async ({ roleId, permission, resource }: AddPermissionsSchema) => {
  const response = await httpService.post(`/rolesPermissionsResources/${roleId}`, { permission, resource });
  return response.data;
};

export default addPermission;
