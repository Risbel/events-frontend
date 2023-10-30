import create from "zustand";

interface State {
  cartItems: ICart[];
  addToCart: ({}: ICart) => void;
  removeFromCart: ({}: ICart) => void;
}

const useCart = create<State>((set, get) => ({
  cartItems: [],

  addToCart: (ticket) => {
    const existNewItem = get().cartItems.find((item) => item.id === ticket.id);

    //una condicion para actualizar si existe el item o guardar si no existe
    const cartItems = existNewItem
      ? get().cartItems.map((item) => (item.id === existNewItem.id ? ticket : item))
      : [...get().cartItems, ticket]; //de lo contrario si no existe entonces guardamos el primero

    return set({ cartItems: cartItems });
  },

  removeFromCart: (ticket) => {
    const cartItems = get().cartItems.filter((item) => item.id !== ticket.id);

    return set({ cartItems });
  },
}));

export default useCart;

export interface ICart {
  id: string;
  price: string;
  shortDescription: string;
  description: string;
  category: string;
  countInStock: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
  Disco: {
    id: string;
    name: string;
    logo: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
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
