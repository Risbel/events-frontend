import { AddTicketSchema } from "@/components/forms/AddTicketsForm";
import httpService from "@/config/axios.config";

export const createDiscoTickets = async ({ formData, discoId }: { formData: any; discoId: string }) => {
  const response = await httpService.post<IDiscoTickets>(`/discoTicket/${discoId}`, formData);
  return response.data;
};

export interface IDiscoTickets {
  id: string;
  discoId: string;
  price: string;
  largeDescription: string;
  shortDescription: string;
  category: string;
  countInStock: string;
  updatedAt: string;
  createdAt: string;
}
