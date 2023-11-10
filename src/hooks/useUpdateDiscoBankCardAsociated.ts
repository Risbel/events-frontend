import { updateDiscoBankCard } from "@/services/updateDiscoBankCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateDiscoBankCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDiscoBankCard,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
