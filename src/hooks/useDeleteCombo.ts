import { deleteCombo } from "@/services/deleteCombo";
import { deleteExperience } from "@/services/deleteExperience";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCombo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCombo,
    onSuccess: () => {
      queryClient.invalidateQueries(["combosByDiscoId"]);
      queryClient.invalidateQueries(["discoTicketById"]);
    },
  });
};
