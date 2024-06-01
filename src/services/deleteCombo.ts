import httpService from "@/config/axios.config";

export const deleteCombo = async (id: string) => {
  const response = await httpService.delete(`/combo/${id}`);
  return response.data;
};
