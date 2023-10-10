import httpService from "@/config/axios.config";

export const getSubscriptionsById = async (id: string) => {
  const response = await httpService.get<ISubscriptionsByUserId[]>(`/subscription/${id}`);
  return response.data;
};

export interface ISubscriptionsByUserId {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  roleId: string;
  discoId: string;
  Disco: Disco;
}

export interface Disco {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}
