import { editCombo } from "@/services/editCombo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditCombos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editCombo,
    onSuccess: () => {
      queryClient.invalidateQueries(["combosByDiscoId"]);
    },
  });
};
