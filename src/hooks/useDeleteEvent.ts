import { deleteEvent } from "@/services/deleteEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["myEvents"]);
    },
  });
};
