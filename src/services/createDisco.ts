import { AddDiscoSchema } from "@/components/forms/AddDiscos";
import httpService from "@/config/axios.config";

export const createDisco = async (data: AddDiscoSchema) => {
  const resp = await httpService.post("/disco", data);
  return resp.data;
};
