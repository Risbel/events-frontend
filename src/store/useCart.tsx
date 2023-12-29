import { create } from "zustand";

interface State {
  cartItems: ICart[];
  addToCart: ({}: ICart) => void;
  removeFromCart: ({}: any) => void;
  resetCart: () => void;
}

const useCart = create<State>((set, get) => ({
  cartItems: [],

  addToCart: (ticket) => {
    const newTicket = [ticket];
    const existNewItem = get().cartItems.find((item) => item.id === ticket.id);

    const hasDuplicateExpDate = ticket?.expDate
      ? get().cartItems.some((item) => item.expDate === ticket.expDate)
      : true;

    //una condicion para actualizar si existe el item o guardar si no existe
    const cartItems = existNewItem
      ? get().cartItems.map((item) => (item.id === existNewItem.id ? ticket : item))
      : [...get().cartItems, ticket]; //de lo contrario si no existe entonces guardamos el primero

    const finalCartItems = hasDuplicateExpDate ? cartItems : newTicket;

    return set({ cartItems: finalCartItems });
  },

  removeFromCart: (ticket) => {
    const cartItems = get().cartItems.filter((item) => item.id !== ticket.id);

    return set({ cartItems });
  },
  resetCart: () => {
    return set({ cartItems: [] });
  },
}));

export default useCart;

export interface ICart {
  id: string;
  price: string;
  shortDescription: string;
  largeDescription: string;
  category: string;
  countInStock: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
  expDate: string;
  comboDetail: IComboDetail;
  Disco: {
    id: string;
    name: string;
    logo: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    discoDetail: IDiscoDetail;
  };
  comboReservations: [];
  ticketImages: {
    id: string;
    image: string;
    imageText: string | null;
    createdAt: string;
    updatedAt: string;
    discoTicketId: string;
  }[];
  quantity: number;
}

export interface IDiscoDetail {
  id: string;
  description: string;
  largeDescription: string;
  bgImage: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  userBankCardId: string;
  administrator: string;
  discoId: string;
  userBankCard: {
    id: string;
    number: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
  };
}

interface IComboDetail {
  id: string;
  description: string;
  image: string;
  imageCloudId: string;
  createdAt: string;
  updatedAt: string;
  comboId: string;
}
