import { createEventNotification } from "@/services/createEventNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEventNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEventNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notificationsByEventId"]);
      queryClient.invalidateQueries(["notificationsByUserEvent"]);
    },
  });
};
