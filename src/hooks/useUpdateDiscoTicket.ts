import { updateDiscoTicket } from "@/services/updateDiscoTicket";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateDiscoTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDiscoTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoTickets"] });
    },
  });
};
