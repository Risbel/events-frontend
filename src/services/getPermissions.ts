import httpService from "@/config/axios.config";

export const getPermissions = async (): Promise<Permissions[]> => {
  const response = await httpService.get("/permission");
  return response.data;
};

export interface Permissions {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
