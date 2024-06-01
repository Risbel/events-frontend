import { createAsociationComboTicket } from "@/services/createAsociationComboTicket";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAsociationComboTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAsociationComboTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(["combosByDiscoId"]);
      queryClient.invalidateQueries(["discoTicketById"]);
    },
  });
};
