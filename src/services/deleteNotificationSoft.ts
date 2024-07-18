import httpService from "@/config/axios.config";

export const deleteNotificationSoft = async (notificationId: string) => {
  const response = await httpService.put(`/notifications/updateIsDeleted/${notificationId}`);
  return response.data;
};
