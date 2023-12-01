import httpService from "@/config/axios.config";

export const createCombo = async ({ formData, discoId }: { formData: any; discoId: string }) => {
  const response = await httpService.post(`/combo/${discoId}`, formData);
  return response.data;
};
