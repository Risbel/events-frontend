import httpService from "@/config/axios.config";

export const getMyEvents = async (userId: string | undefined) => {
  const response = await httpService.get<any[]>(`/disco/myEvents/${userId}`);
  return response.data;
};
