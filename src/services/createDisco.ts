import httpService from "@/config/axios.config";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";

export const createDisco = async (data: AddDiscoSchema) => {
  const resp = await httpService.post("/disco", data);
  return resp.data;
};
