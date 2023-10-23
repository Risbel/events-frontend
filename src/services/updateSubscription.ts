import { RoleSchema } from "@/components/forms/UpdateRoleForm";
import httpService from "@/config/axios.config";

export const updateSubscription = async (data: RoleSchema) => {
  const { role: roleId, idSubscription } = data;

  const response = await httpService.put(`/subscription/${idSubscription}`, { roleId });
  return response.data;
};
