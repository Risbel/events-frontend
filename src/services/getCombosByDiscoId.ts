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
  comboDetail: {
    id: string;
    description: string;
    image: string;
    imageCloudId: string;
    createdAt: string;
    updatedAt: string;
    comboId: string;
  };
  comboReservations: [];
  Disco: IDisco;
}

interface IDisco {
  id: string;
  name: string;
  logo: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  discoDetail: {
    id: string;
    description: string;
    largeDescription: string;
    bgImage: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    administrator: string;
    discoId: string;
  };
}
