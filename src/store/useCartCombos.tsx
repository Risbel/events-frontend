import create from "zustand";

interface ComboState {
  cartItemsCombo: any[];
  addComboToCart: ({}: any) => void;
  removeComboFromCart: ({}: any) => void;
  discartCombos: () => void;
}

const useCartCombos = create<ComboState>((set, get) => ({
  cartItemsCombo: [],

  addComboToCart: (combo) => {
    const newCombo = [combo];
    const existNewItem = get().cartItemsCombo.find((item) => item.id === combo.id);

    const hasDuplicateExpDate = get().cartItemsCombo.some((item) => item.expDate === combo.expDate);

    //una condicion para actualizar si existe el item o guardar si no existe
    const cartItemsCombo = existNewItem
      ? get().cartItemsCombo.map((item) => (item.id === existNewItem.id ? combo : item))
      : [...get().cartItemsCombo, combo]; //de lo contrario si no existe entonces guardamos el primero

    const finalCartItemsCombo = hasDuplicateExpDate ? cartItemsCombo : newCombo;

    return set({ cartItemsCombo: finalCartItemsCombo });
  },
  removeComboFromCart: () => {},
  discartCombos: () => {},
}));

export default useCartCombos;
