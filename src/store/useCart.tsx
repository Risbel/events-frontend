import { DiscoDetail } from "@/services/getDisco";
import { create } from "zustand";

interface State {
  cartItems: ICart[];
  addToCart: ({}: ICart) => void;
  removeFromCart: ({}: any) => void;
  resetCart: () => void;
}

const useCart = create<State>((set, get) => ({
  cartItems: [],

  addToCart: (payload) => {
    const newTicket = [payload];
    const existNewItem = get().cartItems.find((item) => item.id === payload.id);

    const hasDuplicateExpDate = payload?.expDate
      ? get().cartItems.some((item) => item.expDate === payload.expDate)
      : true;

    //una condicion para actualizar si existe el item o guardar si no existe
    const cartItems = existNewItem
      ? get().cartItems.map((item) => (item.id === existNewItem.id ? payload : item))
      : [...get().cartItems, payload]; //de lo contrario si no existe entonces guardamos el primero

    const finalCartItems = hasDuplicateExpDate ? cartItems : newTicket;

    return set({ cartItems: finalCartItems });
  },

  removeFromCart: (payload) => {
    const cartItems = get().cartItems.filter((item) => item.id !== payload.id);

    return set({ cartItems });
  },
  resetCart: () => {
    return set({ cartItems: [] });
  },
}));

export default useCart;

export interface ICart {
  id?: string;
  discoSlug?: string;
  discoId?: string;
  comboId?: string | null;
  discoTicketId?: string | null;
  price: string;
  comboDescription?: string | null;
  ticketDescription?: string | null;
  comboImage?: string | null;
  ticketImages?: any[];
  category: string;
  collaborator: string | null;
  expDate: string;
  quantity: number;
  countInStock: number;
}
