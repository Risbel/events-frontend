import httpService from "@/config/axios.config";

export const getReservationsByDiscoSlug = async (slug: string) => {
  const response = await httpService.get<IReservationsBySlug>(`/reservation/${slug}/reservBySlug`);
  return response.data;
};

export interface IReservationsBySlug {
  id: string;
  slug: string;
  reservations: IReservationsByDiscoSlug[];
}

export interface IReservationsByDiscoSlug {
  id: string;
  userId: string;
  createdAt: string;
  User: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
  };
  ticketsReservations: [
    {
      id: string;
      quantity: string;
      discoTicketId: string;
      DiscoTicket: {
        category: string;
        id: string;
        price: string;
        expDate: string;
        shortDescription: string;
      };
    }
  ];
}
