import { deleteNotificationSoft } from "@/services/deleteNotificationSoft";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNotificationSoft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotificationSoft,
    onSuccess: () => {
      queryClient.invalidateQueries(["notificationsByUserEvent"]);
    },
  });
};
