import httpService from "@/config/axios.config";

export const getNotificationsByEventId = async (
  eventId: string,
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  const response = await httpService.get<INotifications[]>(`/notifications/${eventId}`, {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data;
};

export interface INotifications {
  id: string;
  title: string;
  description: string;
  type: "promo" | "alert" | "info";
  priority: string | null;
  expDate: Date;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}
