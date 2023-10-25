import { AddTicketSchema } from "@/components/forms/AddTicketsForm";
import httpService from "@/config/axios.config";

export const createDiscoTickets = async (data: AddTicketSchema) => {
  const response = await httpService.post<IDiscoTickets>(`/discoTicket/${data.discoId}`, data);
  return response.data;
};

export interface IDiscoTickets {
  id: string;
  discoId: string;
  price: string;
  description: string;
  category: string;
  quantity: string;
  updatedAt: string;
  createdAt: string;
}
