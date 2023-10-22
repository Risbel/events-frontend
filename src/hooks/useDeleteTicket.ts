import { deleteDiscoTicket } from "@/services/deleteDiscoTicket";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDiscoTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(["discoTickets"]);
    },
  });
};
