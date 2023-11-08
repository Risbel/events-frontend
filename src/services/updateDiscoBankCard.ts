import httpService from "@/config/axios.config";

export const updateDiscoBankCard = async ({ userBankCardId }: { userBankCardId: string }) => {
  const response = await httpService.put(`/discoDetail/${userBankCardId}`);
  return response.data;
};
