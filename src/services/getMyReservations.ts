import httpService from "@/config/axios.config";

const getMyReservations = async (userId: string) => {
  const response = await httpService.get<IReservationByUserId[]>(`/reservation/${userId}`);
  return response.data;
};

export default getMyReservations;

export interface IReservationByUserId {
  id: string;
  colaborator: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  discoId: string;
  ticketsReservations: [
    {
      id: string;
      quantity: number;
      createdAt: string;
      updatedAt: string;
      reservationId: string;
      discoTicketId: string;
      DiscoTicket: {
        id: string;
        price: number;
        shortDescription: string;
        largeDescription: string;
        category: string;
        countInStock: string;
        expDate: string;
        createdAt: string;
        updatedAt: string;
        discoId: string;
        Disco: {
          id: string;
          name: string;
          logo: string;
          slug: string;
          startDate: string;
          endDate: string;
          createdAt: string;
          updatedAt: string;
        };
      };
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
      ticketReservationCombos: {
        id: string;
        quantity: number;
        createdAt: string;
        updatedAt: string;
        ticketReservationId: string;
        comboId: string;
        Combo: {
          id: string;
          price: number;
          countInStock: number;
          category: string;
          createdAt: string;
          updatedAt: string;
          discoId: string;
          Disco: {
            id: string;
            name: string;
            logo: string;
            slug: string;
            startDa: string;
            endDate: string;
            created: string;
            updated: string;
          };
        };
      }[];
    }
  ];
}
