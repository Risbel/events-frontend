import { getNotificationsByEventId } from "@/services/getNotificationsByEventId";
import { useQuery } from "@tanstack/react-query";

export const useGetNotificationsByEventId = (eventId: string, page?: number, limit?: number, search?: string) => {
  const isEventId = eventId ? true : false;
  return useQuery({
    queryFn: () => getNotificationsByEventId(eventId, page, limit, search),
    queryKey: ["notificationsByEventId", eventId, page],
    enabled: isEventId,
  });
};
