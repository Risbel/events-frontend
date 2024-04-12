import { createReservation } from "@/services/createReservation";
import useCart from "@/store/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export const useCreateReservation = () => {
  const { resetCart } = useCart();
  const queryClient = useQueryClient();
  const param = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries();
      param?.slug && router.push(`/event/${param?.slug}/reservations`);
      resetCart();
    },
  });
};
