import httpService from "@/config/axios.config";

export const updateDiscoCardAsociated = async ({ id, userBankCardId }: { id: string; userBankCardId: string }) => {
  const response = await httpService.put(`/discoDetail/${id}`, userBankCardId);
  return response.data;
};
