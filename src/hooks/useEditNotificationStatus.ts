import { editNotificationStatus } from "@/services/editNotificationStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditNotificationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editNotificationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["notificationsByUserEvent"]);
    },
  });
};
