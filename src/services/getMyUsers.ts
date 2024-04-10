import httpService from "@/config/axios.config";

export const getMyUsers = async (userId: string | undefined) => {
  const response = await httpService.get<IMyUsers[]>(`/user/myUsers/${userId}`);
  return response.data;
};

export interface IMyUsers {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
