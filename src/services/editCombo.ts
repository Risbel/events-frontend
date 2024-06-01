import httpService from "@/config/axios.config";

export const editCombo = async ({ id, data }: { id: string; data: any }) => {
  const response = await httpService.put(`/combo/${id}`, data);
  return response.data;
};
