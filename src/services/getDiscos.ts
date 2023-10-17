import httpService from "@/config/axios.config";
import { DataDisco } from "./getDisco";

export const getDiscos = async (): Promise<DataDisco[]> => {
  try {
    const response = await httpService.get(`/disco`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
