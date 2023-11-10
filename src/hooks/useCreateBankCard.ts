import { createBankCard } from "@/services/createBankCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBankCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBankCard,
    onSuccess: () => {
      queryClient.invalidateQueries(["userBankCard"]);
    },
  });
};
