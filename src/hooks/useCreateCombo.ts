import { createCombo } from "@/services/createCombo";
import { useMutation } from "@tanstack/react-query";

export const useCreateCombo = () => {
  return useMutation({
    mutationFn: createCombo,
  });
};
