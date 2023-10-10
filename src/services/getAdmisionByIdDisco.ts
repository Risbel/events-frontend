import httpService from "@/config/axios.config";

export const getAdmisionByIdDisco = async (discoId: string): Promise<ISession[]> => {
  try {
    const resp = await httpService.get(`/discoAdmision/${discoId}`);
    return resp.data;
  } catch (error: any) {
    return error.message;
  }
};

interface ISession {
  id: string;
  price: string;
  description: string;
  category: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}
