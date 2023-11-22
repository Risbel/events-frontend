import { getDiscoTicketById } from "@/services/getDiscoTicketById";
import { useQuery } from "@tanstack/react-query";

export const useGetDiscoTicketById = (idTicket: string | any) => {
  const isIdTicket = idTicket ? true : false;

  return useQuery({
    queryKey: ["discoById", idTicket],
    queryFn: () => getDiscoTicketById(idTicket),
    enabled: isIdTicket,
    onError: (err: IApiError) => err,
  });
};

interface IApiError {
  response: any;
}
