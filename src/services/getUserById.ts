import httpService from "@/config/axios.config";

export const getUserById = async (id: any): Promise<IuserById> => {
  const response = await httpService.get(`/user/${id}`);
  return response.data;
};

export interface IuserById {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  subscriptions: Isubscription[];
}

interface Isubscription {
  id: string;
  userId: string;
  roleId: string;
  discoId: string;
  DiscoRole: IdiscoRole;
  Disco: IDisco;
}

interface IdiscoRole {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}

interface IDisco {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}
