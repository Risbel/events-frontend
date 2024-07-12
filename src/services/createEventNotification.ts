import httpService from "@/config/axios.config";

export const createEventNotification = async ({ formData, eventId }: { formData: any; eventId: string }) => {
  const response = await httpService.post(`/notifications/${eventId}`, formData);
  return response.data;
};
