import httpService from "@/config/axios.config";

export const deleteSubscription = async (id: string) => {
  const response = await httpService.delete(`/subscription/${id}`);
  return response.data;
};
