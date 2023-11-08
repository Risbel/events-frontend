import { updateDiscoCardAsociated } from "@/services/updateDiscoCardAsociated";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateDiscoCardAsociated = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDiscoCardAsociated,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoBySlug"] });
    },
  });
};
