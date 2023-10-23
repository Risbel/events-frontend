import httpService from "@/config/axios.config";

export const getRolesByDiscoId = async (discoId: string) => {
  const response = await httpService.get<IRolesByDiscoId>(`disco/roles/${discoId}`);
  return response.data;
};

export interface IRolesByDiscoId {
  id: string;
  name: string;
  logo: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  DiscoRoles: IDiscoRoles[];
}

export interface IDiscoRoles {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}
