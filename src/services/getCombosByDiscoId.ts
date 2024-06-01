import httpService from "@/config/axios.config";

export const getCombosByDiscoId = async (discoId: string) => {
  const response = await httpService.get<ICombo[]>(`/combo/${discoId}`);
  return response.data;
};

export interface ICombo {
  id: string;
  price: string;
  countInStock: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
  isDeleted: boolean;
  comboDetail: {
    id: string;
    description: string;
    image: string;
    imageCloudId: string;
    createdAt: string;
    updatedAt: string;
    comboId: string;
  };
  ticketCombos: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      discoTicketId: string;
      comboId: string;
      DiscoTicket: {
        id: string;
        price: number;
        shortDescription: string;
        largeDescription: string;
        category: string;
        countInStock: number;
        expDate: string;
        createdAt: string;
        updatedAt: string;
        discoId: string;
      };
    }
  ];
}
