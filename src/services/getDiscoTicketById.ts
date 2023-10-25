import httpService from "@/config/axios.config";

export const getDiscoTicketById = async (idTicket: string) => {
  const response = await httpService.get<IDiscoTicketById>(`/discoTicket/${idTicket}`);
  return response.data;
};

export interface IDiscoTicketById {
  id: string;
  price: string;
  description: string;
  category: string;
  quantity: string;
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
