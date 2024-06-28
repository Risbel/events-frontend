import httpService from "@/config/axios.config";
import { format } from "date-fns";

export const getReservationsByDiscoSlug = async (slug: string, limit?: number, cursor?: string) => {
  const today = format(new Date(), "yyyy-MM-dd"); //yy-mm-dddd
  cursor = cursor || today;

  const response = await httpService.get<Reservation[]>(
    `/reservation/${slug}/reservBySlug?limit=${limit || 10}&cursor=${cursor}`
  );

  return response.data;
};

export interface Reservation {
  userId: string;
  createdAt: string;
  id: string;
  expDate: string;
  User: {
    name: string;
    phone: string;
    email: string;
    lastName: string;
  };
  ticketsReservations: TicketReservation[];
}
export interface TicketReservation {
  id: string;
  quantity: number;
  discoTicketId: string;
  DiscoTicket: {
    price: number;
    expDate: string;
    shortDescription: string;
    id: string;
    category: "economy" | "common" | "VIP";
  };
}
