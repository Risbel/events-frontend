import { createDiscoTickets } from "@/services/createDiscoTickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDiscoTickets = (discoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiscoTickets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoTickets", discoId] });
    },
  });
};
