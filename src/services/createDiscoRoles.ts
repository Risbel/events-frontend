import httpService from "@/config/axios.config";

const createDiscoRoles = async ({ discoId, name }: { discoId: string; name: string }) => {
  const response = await httpService.post(`/discoRoles/${discoId}`, { name });
  return response.data;
};

export default createDiscoRoles;
