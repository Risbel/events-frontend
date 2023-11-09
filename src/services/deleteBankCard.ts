import httpService from "@/config/axios.config";

export const deleteBankCard = async (id: string) => {
  const response = await httpService.delete(`/userBankCard/${id}`);
  return response.data;
};
