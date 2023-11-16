import httpService from "@/config/axios.config";
import { ICart } from "@/store/useCart";

export const getDiscoTicketById = async (idTicket: string) => {
  const response = await httpService.get<ICart>(`/discoTicket/${idTicket}`);
  return response.data;
};
