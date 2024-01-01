import httpService from "@/config/axios.config";

const getUsers = async (): Promise<Iuser[]> => {
  const response = await httpService.get("/user");
  return response.data;
};

export default getUsers;

export interface Iuser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
