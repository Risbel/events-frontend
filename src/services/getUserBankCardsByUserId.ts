import httpService from "@/config/axios.config";

export const getUserBankCardsByUserId = async (userId: string) => {
  const response = await httpService.get<IUserBankCardByUserId[]>(`/userBankCard/${userId}`);
  return response.data;
};

export interface IUserBankCardByUserId {
  id: string;
  number: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  discoDetail: IdiscoDetail;
}

interface IdiscoDetail {
  id: string;
}
