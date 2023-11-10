import httpService from "@/config/axios.config";

export const updateDiscoBankCard = async ({
  userBankCardId,
  discoDetailId,
}: {
  userBankCardId: string;
  discoDetailId: string;
}) => {
  const response = await httpService.put(`/discoDetail/${discoDetailId}`, { userBankCardId });
  return response.data;
};
