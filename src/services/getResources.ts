import httpService from "@/config/axios.config";

export const getResources = async (): Promise<Resource[]> => {
  try {
    const response = await httpService.get("/resource");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export interface Resource {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
