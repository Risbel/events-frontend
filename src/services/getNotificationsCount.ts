import httpService from "@/config/axios.config";

export const getNotificationsCount = async (userId: string | undefined, eventId: string | undefined) => {
  const response = await httpService.get(`/notifications/subscription/count/${userId}/${eventId}`);
  return response.data;
};
