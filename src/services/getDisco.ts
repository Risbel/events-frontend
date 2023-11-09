import httpService from "@/config/axios.config";

const getDisco = async ({ name, userId }: { name: string; userId: string | undefined }) => {
  const response = await httpService.get<{ disco: DataDisco; subscription: Subscription }>(`/disco/${name}/${userId}`);
  return response.data;
};

export default getDisco;

export interface DataDisco {
  createdAt: string;
  discoDetail: DiscoDetail;
  id: string;
  logo: string;
  name: string;
  slug: string;
  updatedAt: string;
}
export interface DiscoDetail {
  id: string;
  description: string;
  largeDescription: string;
  bgImage: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  administrator: string;
  discoId: string;
  discoImages: DiscoImages[];
  discoNetworks: [];
  discoPhones: [];
  userBankCard: IUserBankCard;
}

export interface DiscoImages {
  createdAt: string;
  discoDetailId: string;
  id: string;
  image: string;
  imageText: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  roleId: string;
  discoId: string;
  DiscoRole: DiscoRole;
}

export interface DiscoRole {
  id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}

export interface IUserBankCard {
  id: string;
  number: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
