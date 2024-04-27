import httpService from "@/config/axios.config";

export const getDiscoTicketById = async (idTicket: string) => {
  const response = await httpService.get<IDiscoTicketByIdDisco>(`/discoTicket/${idTicket}`);
  return response.data;
};

export interface IDiscoTicketByIdDisco {
  id: string;
  price: string;
  shortDescription: string;
  largeDescription: string;
  category: string;
  countInStock: number;
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
    discoDetail: {
      id: string;
      h1Banner: string;
      bannerDescription: string;
      aboutDescription: string;
      titleTextCarousel: string;
      titleTextAbout: string;
      bgImage: string;
      address: string;
      createdAt: string;
      updatedAt: string;
      userBankCardId: string;
      administrator: string;
      discoId: string;
    };
  };
  ticketImages: any[];
  ticketCombos: IComboData[];
}

export interface IComboData {
  id: string;
  createdAt: string;
  updatedAt: string;
  discoTicketId: string;
  comboId: string;
  Combo: {
    id: string;
    price: string;
    countInStock: number;
    category: string;
    createdAt: string;
    updatedAt: string;
    discoId: string;
    comboDetail: {
      id: string;
      description: string;
      image: string;
      imageCloudId: string;
      createdAt: string;
      updatedAt: string;
      comboId: string;
    };
  };
}
