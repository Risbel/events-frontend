import httpService from "@/config/axios.config";

export const getUserByToken = async () => {
  const response = await httpService.get("/user/token");
  return response.data;
};
