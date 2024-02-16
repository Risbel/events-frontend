import httpService from "@/config/axios.config";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";

export const createDisco = async (formData: any) => {
  const resp = await httpService.post("/disco", formData);
  return resp.data;
};
