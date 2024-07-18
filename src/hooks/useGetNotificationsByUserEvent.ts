import { getNotificationsByUserEvent } from "@/services/getNotificationsByUserEvent";
import { useQuery } from "@tanstack/react-query";

export const useGetNotificationsByUserEvent = (
  userId: string | undefined,
  eventId: string | undefined,
  page?: number,
  limit?: number,
  search?: string
) => {
  const isUserId = userId ? true : false;
  return useQuery({
    queryFn: () => getNotificationsByUserEvent(userId, eventId, page, limit, search),
    queryKey: ["notificationsByUserEvent", userId, page],
    enabled: isUserId,
  });
};
