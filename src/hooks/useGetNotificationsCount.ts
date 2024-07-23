import { getNotificationsCount } from "@/services/getNotificationsCount";
import { useQuery } from "@tanstack/react-query";

export const useGetNotificationsCount = (userId: string | undefined, eventId: string | undefined) => {
  const isUserId = userId ? true : false;
  return useQuery({
    queryFn: () => getNotificationsCount(userId, eventId),
    queryKey: ["notificationsCount", userId],
    enabled: isUserId,
  });
};
