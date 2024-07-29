import httpService from "@/config/axios.config";

export const createDisco = async (formData: any) => {
  const resp = await httpService.post("/disco", formData);
  return resp.data;
};
