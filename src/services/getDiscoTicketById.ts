import httpService from "@/config/axios.config";

export const getDiscoTicketById = async (idTicket: string) => {
  const response = await httpService.get<IDiscoTicketById>(`/discoTicket/${idTicket}`);
  return response.data;
};

export interface IDiscoTicketById {
  id: string;
  price: string;
  shortDescription: string;
  description: string;
  category: string;
  countInStock: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
  Disco: IDisco;
  ticketImages: IticketImages[];
  quantity: number;
}

interface IDisco {
  id: string;
  name: string;
  logo: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface IticketImages {
  id: string;
  image: string;
  imageText: string;
  createdAt: string;
  updatedAt: string;
  discoTicketId: string;
}
