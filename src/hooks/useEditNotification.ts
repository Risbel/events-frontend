import { editNotification } from "@/services/editNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notificationsByEventId"]);
    },
  });
};
