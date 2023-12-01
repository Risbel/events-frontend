import httpService from "@/config/axios.config";

export const getCombosByDiscoId = async (discoId: string) => {
  const response = await httpService.get(`/combo/${discoId}`);
  return response.data;
};
