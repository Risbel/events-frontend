import { getReservationsByDiscoSlug } from "@/services/getReservationsByDiscoSlug";
import { useQuery } from "@tanstack/react-query";

export const useGetReservationsByDiscoSlug = (slug: string | any) => {
  const isSlug = slug ? true : false;

  return useQuery({
    queryKey: ["reservationsByDiscoSlug", slug],
    queryFn: () => getReservationsByDiscoSlug(slug),
    enabled: isSlug,
  });
};
