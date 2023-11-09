import { deleteBankCard } from "@/services/deleteBankCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBankCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBankCard,
    onSuccess: () => {
      queryClient.invalidateQueries(["userBankCard"]);
    },
  });
};
