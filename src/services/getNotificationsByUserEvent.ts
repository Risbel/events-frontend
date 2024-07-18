import httpService from "@/config/axios.config";

export const getNotificationsByUserEvent = async (
  userId: string | undefined,
  eventId: string | undefined,
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  const response = await httpService.get<INotifications>(`/notifications/subscription/${userId}/${eventId}`, {
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
  createdAt: string;
  updatedAt: string;
  userId: string;
  roleId: string;
  discoId: string;
  subscriptionNotifications: ISubscriptionNotifications[];
}

export interface ISubscriptionNotifications {
  id: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  subscriptionId: string;
  eventNotificationId: string;
  eventNotification: IEventNotification;
}

export interface IEventNotification {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  expDate: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}
