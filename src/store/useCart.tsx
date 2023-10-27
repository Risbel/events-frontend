import create from "zustand";

interface State {
  cartItems: any[];
  addToCart: ({}: any) => void;
  removeFromCart: ({}: any) => void;
}

export const useCart = create<State>((set, get) => ({
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
