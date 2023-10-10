import httpService from "@/config/axios.config";

export const getPermissions = async (): Promise<Permissions[]> => {
  try {
    const response = await httpService.get("/permission");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export interface Permissions {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
