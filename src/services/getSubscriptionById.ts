import httpService from "@/config/axios.config";

export const getSubscriptionsById = async (id: string): Promise<ISubscriptionsByUserId[]> => {
  const response = await httpService.get(`/subscription/${id}`);
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
  DiscoRole: IDiscoRole;
}

export interface Disco {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDiscoRole {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}
