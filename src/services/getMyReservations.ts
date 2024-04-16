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
  comboReservations: IComboreservation[];
}

interface ITicketsReservation {
  id: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
  reservationId: string;
  discoTicketId: string;
  DiscoTicket: IDiscoTicket;
  companions: [
    {
      id: string;
      firstName: string;
      lastName: string;
      createdAt: string;
      updatedAt: string;
      ticketReservationId: string;
    }
  ];
}

interface IComboreservation {
  id: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
  reservationId: string;
  comboId: string;
  Combo: {
    id: string;
    price: string;
    countInStock: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    discoId: string;
    Disco: {
      id: string;
      name: string;
      logo: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
    };
  };
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
