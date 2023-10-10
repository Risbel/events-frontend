import httpService from "@/config/axios.config";

export const getUserByToken = async (token: string) => {
  try {
    const response = await httpService.get(`/user/token/${token}`);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};
