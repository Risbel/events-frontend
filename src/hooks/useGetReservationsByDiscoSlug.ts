import { getReservationsByDiscoSlug } from "@/services/getReservationsByDiscoSlug";
import { useQuery } from "@tanstack/react-query";

export const useGetReservationsByDiscoSlug = (
  slug: string | any,
  limit?: number,
  cursor?: "yesterday" | "today" | "pending" | "expired"
) => {
  const isSlug = slug ? true : false;

  return useQuery({
    queryKey: ["reservationsByDiscoSlug", slug, cursor],
    queryFn: () => getReservationsByDiscoSlug(slug, limit, cursor),
    enabled: isSlug,
  });
};
