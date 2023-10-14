import httpService from "@/config/axios.config";

const getUsers = async (): Promise<Iuser[]> => {
  try {
    const response = await httpService.get("/user");

    return response.data;
  } catch (error: any) {
    return error.message;
  }
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
