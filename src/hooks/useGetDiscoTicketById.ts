import { getDiscoTicketById } from "@/services/getDiscoTicketById";
import { useQuery } from "@tanstack/react-query";

export const useGetDiscoTicketById = (idTicket: string) => {
  const isIdTicket = idTicket ? true : false;

  return useQuery({
    queryKey: ["discoById", idTicket],
    queryFn: () => getDiscoTicketById(idTicket),
    enabled: isIdTicket,
  });
};
