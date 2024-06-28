import getReservationCombosById from "@/services/getReservationCombosById";
import { useQuery } from "@tanstack/react-query";

export const useGetReservationCombosById = (id: string) => {
  return useQuery({
    queryKey: ["reservationCombosById", id],
    queryFn: () => getReservationCombosById(id),
  });
};
