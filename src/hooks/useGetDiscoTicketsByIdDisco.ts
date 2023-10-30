import { getDiscoTicketsByIdDisco } from "@/services/getDiscoTicketsByIdDisco";
import { IApiError } from "@/types/react-query";
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
    onError: (err: IApiError) => err,
  });
};
