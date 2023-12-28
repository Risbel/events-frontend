import { createCombo } from "@/services/createCombo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCombo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCombo,
    onSuccess: () => {
      queryClient.invalidateQueries(["combosByDiscoId"]);
    },
  });
};
