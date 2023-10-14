import httpService from "@/config/axios.config";

export const getUserByToken = async () => {
  try {
    const response = await httpService.get("/user/token");
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};
