import { getDiscoTicketsByIdDisco } from "@/services/getDiscoTicketsByIdDisco";
import { useQuery } from "@tanstack/react-query";

export const useGetDiscoTicketsByIdDisco = (discoId: string | undefined) => {
  const isDiscoId = discoId ? true : false;

  return useQuery({
    queryKey: ["discoTickets", discoId],
    queryFn: () => {
      if (discoId) {
        return getDiscoTicketsByIdDisco(discoId);
      }
    },
    enabled: isDiscoId,
  });
};
