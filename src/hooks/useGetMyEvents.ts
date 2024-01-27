import { getMyEvents } from "@/services/getMyEvents";
import { useQuery } from "@tanstack/react-query";

export const useGetMyEvents = (userId: string | undefined) => {
  const isUserId = userId ? true : false;

  return useQuery({
    queryKey: ["myEvents", userId],
    queryFn: () => getMyEvents(userId),
    enabled: isUserId,
  });
};
