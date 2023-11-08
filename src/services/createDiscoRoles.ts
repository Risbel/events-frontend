import { AddRoleSchema } from "@/components/forms/AddRolesForm";
import httpService from "@/config/axios.config";

const createDiscoRoles = async ({ discoId, name }: AddRoleSchema) => {
  const response = await httpService.post(`/discoRoles/${discoId}`, { name });
  return response.data;
};

export default createDiscoRoles;
