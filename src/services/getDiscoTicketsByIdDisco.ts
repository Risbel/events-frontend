import httpService from "@/config/axios.config";

export const getDiscoTicketsByIdDisco = async (discoId: string): Promise<IDiscoTicket[]> => {
  const resp = await httpService.get(`/discoTickets/${discoId}`);
  return resp.data;
};

export interface IDiscoTicket {
  id: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}
