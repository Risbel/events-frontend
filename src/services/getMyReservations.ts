import httpService from "@/config/axios.config";

const getMyReservations = async (userId: string) => {
  const response = await httpService.get<IReservationByUserId[]>(`/reservation/${userId}`);
  return response.data;
};

export default getMyReservations;

export interface IReservationByUserId {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  ticketsReservations: ITicketsReservation[];
}

interface ITicketsReservation {
  id: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
  reservationId: string;
  discoTicketId: string;
  DiscoTicket: IDiscoTicket;
}

interface IDiscoTicket {
  id: string;
  price: string;
  shortDescription: string;
  largeDescription: string;
  category: string;
  countInStock: string;
  expDate: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
  Disco: IDisco;
}

interface IDisco {
  id: string;
  name: string;
  logo: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
