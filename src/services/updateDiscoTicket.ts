import { EditTicketSchema } from "@/components/event/sections/disco-tickets/EditTicketsForm";
import httpService from "@/config/axios.config";

export const updateDiscoTicket = async (data: EditTicketSchema) => {
  const id = data.id;

  const response = await httpService.put(`/discoTicket/${id}`, data);
  return response.data;
};
