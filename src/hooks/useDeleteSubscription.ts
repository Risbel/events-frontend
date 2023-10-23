import { deleteSubscription } from "@/services/deleteSubscription";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  const { mutate: unsubscribe } = useMutation({
    mutationFn: (id) => deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["discoBySlug"]);
    },
  });

  return { unsubscribe };
};
