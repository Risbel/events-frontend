import { updateDiscoBankCard } from "@/services/updateDiscoBankCard";
import { useMutation } from "@tanstack/react-query";

export const useUpdateDiscoBankCard = () => {
  return useMutation({
    mutationFn: updateDiscoBankCard,
  });
};
