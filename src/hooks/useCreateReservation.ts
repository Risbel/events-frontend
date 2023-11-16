import { createReservation } from "@/services/createReservation";
import useCart from "@/store/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReservation = () => {
  const { resetCart } = useCart();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries();
      resetCart();
    },
  });
};
