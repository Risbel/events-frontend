import httpService from "@/config/axios.config";

const createDiscoRoles = async ({ discoId, name }: { discoId: string; name: string }) => {
  try {
    const response = await httpService.post(`/discoRoles/${discoId}`, { name });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export default createDiscoRoles;
