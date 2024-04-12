import httpService from "@/config/axios.config";

export const createReservation = async ({ userId, payloadReservation: cartItems }: IReservation) => {
  const response = await httpService.post<IReservation>("/reservation", { userId, cartItems });
  return response.data;
};

export interface IReservation {
  userId: string;
  payloadReservation: {
    discoId: string;
    discoTicketId: string | null;
    comboId: string | null;
    quantity: number;
    category: string;
    imagesTicket: string | null;
    imagesCombo: string | null;
    comboDescription: string | null;
    ticketDescription: string;
    price: string;
    discoSlug: string;
  }[];
}
