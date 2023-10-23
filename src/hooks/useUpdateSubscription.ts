import { updateSubscription } from "@/services/updateSubscription";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries(["userById"]);
    },
  });
};

export default useUpdateSubscription;
