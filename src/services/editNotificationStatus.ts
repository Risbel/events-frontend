import httpService from "@/config/axios.config";

export const editNotificationStatus = async (notificationId: string) => {
  const response = await httpService.put(`/notifications/updateIsRead/${notificationId}`);
  return response.data;
};
