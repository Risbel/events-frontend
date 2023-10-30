import { deleteSubscription } from "@/services/deleteSubscription";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries(["subscriptionsByUserId"]);
    },
  });
};
