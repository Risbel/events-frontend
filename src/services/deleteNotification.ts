import httpService from "@/config/axios.config";

export const deleteNotification = async (id: string) => {
  const response = await httpService.delete(`/notifications/${id}`);
  return response.data;
};
