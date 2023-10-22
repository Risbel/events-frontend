import { EditTicketSchema } from "@/components/forms/EditTicketsForm";
import httpService from "@/config/axios.config";

export const updateDiscoTicket = async (data: EditTicketSchema) => {
  const id = data.id;

  const response = await httpService.put(`/discoTickets/${id}`, data);
  return response.data;
};
