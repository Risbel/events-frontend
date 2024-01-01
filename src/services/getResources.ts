import httpService from "@/config/axios.config";

export const getResources = async (): Promise<Resource[]> => {
  const response = await httpService.get("/resource");
  return response.data;
};

export interface Resource {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
