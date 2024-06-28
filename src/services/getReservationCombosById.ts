import httpService from "@/config/axios.config";

const getReservationCombosById = async (ticketReservationId: string) => {
  const response = await httpService.get<ReservationComboById[]>(`/reservation/combos/${ticketReservationId}`);
  return response.data;
};

export default getReservationCombosById;

export interface ReservationComboById {
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
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    discoId: string;
  };
}
