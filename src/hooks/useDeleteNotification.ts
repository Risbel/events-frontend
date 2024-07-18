import { deleteNotification } from "@/services/deleteNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notificationsByEventId"]);
      queryClient.invalidateQueries(["notificationsByUserEvent"]);
    },
  });
};
