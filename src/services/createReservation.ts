import httpService from "@/config/axios.config";

export const createReservation = async ({ userId, cartItems }: IReservation) => {
  const groupedByDiscoId = cartItems.reduce<any[]>((result, currentItem) => {
    const obj = {
      discoId: currentItem.discoId,
      items: [currentItem],
    };

    const existingObj = result.find((group) => group.discoId === currentItem.discoId);

    if (existingObj) {
      existingObj.items.push(currentItem);
    } else {
      result.push(obj);
    }

    return result;
  }, []);

  const response = await httpService.post<IReservation>("/reservation", { userId, cartItems: groupedByDiscoId });
  return response.data;
};

export interface IReservation {
  userId: string;
  cartItems: { cardNumber: string; discoId: string; discoTicketId: string; quantity: number }[];
}
