import httpService from "@/config/axios.config";
import { DataDisco } from "./getDisco";

export const getDiscos = async () => {
  const response = await httpService.get<DataDisco[]>(`/disco`);
  return response.data;
};
