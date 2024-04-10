import { handlePay } from "@/services/handlePay";
import { useMutation } from "@tanstack/react-query";

export const useHandlePay = () => {
  return useMutation({
    mutationFn: handlePay,
    onSuccess: (session) => {
      window.location.href = session.url;
    },
  });
};
