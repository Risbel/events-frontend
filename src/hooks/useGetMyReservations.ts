import getMyReservations from "@/services/getMyReservations";
import { useQuery } from "@tanstack/react-query";

export const useGetMyReservations = (userId: string | any) => {
  const isUserId = userId ? true : false;

  return useQuery({
    queryKey: ["myReservations", userId],
    queryFn: () => getMyReservations(userId),
    enabled: isUserId,
  });
};
