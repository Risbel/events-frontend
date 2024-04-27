import httpService from "@/config/axios.config";

export const createReservation = async ({
  userId,
  payloadReservation: cartItems,
  inputList: companions,
}: IReservation) => {
  const response = await httpService.post<any>("/reservation", { userId, cartItems, companions });
  return response.data;
};

export interface IReservation {
  userId: string;
  payloadReservation: {
    discoTicketId: string | null | undefined;
    comboId: string | null | undefined;
    quantity: number;
    discoId: string | undefined;
    colaborator: string | null;
    category: string;
    imagesTicket: string | null;
    comboImage: string | null;
    comboDescription: string | null;
    ticketDescription: string | null;
    price: string;
    discoSlug: string | null;
  }[];
  inputList?: {
    firstName: string;
    lastName: string;
  }[];
}
