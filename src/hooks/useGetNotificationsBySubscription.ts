import { getNotificationsBySubscription } from "@/services/getNotificationsBySubscription";
import { useQuery } from "@tanstack/react-query";

export const useGetNotificationsBySubscription = (
  userId: string | undefined,
  page?: number,
  limit?: number,
  search?: string
) => {
  const isUserId = userId ? true : false;
  return useQuery({
    queryFn: () => getNotificationsBySubscription(userId, page, limit, search),
    queryKey: ["notificationsByEventId", userId, page],
    enabled: isUserId,
  });
};
