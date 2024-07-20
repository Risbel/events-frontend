import { createSubscription } from "@/services/createSubscription";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries(["subscriptionsByUserId"]);
      queryClient.invalidateQueries(["discoBySlug"]);
    },
  });
};
