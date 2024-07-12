import httpService from "@/config/axios.config";

export const editNotification = async ({ id, data }: { id: string; data: any }) => {
  const response = await httpService.put(`/notifications/${id}`, data);
  return response.data;
};
