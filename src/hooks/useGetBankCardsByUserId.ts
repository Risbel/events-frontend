import { getUserBankCardsByUserId } from "@/services/getUserBankCardsByUserId";
import { useQuery } from "@tanstack/react-query";

export const useGetBankCardsByUserId = (userId: string) => {
  const isUserId = userId ? true : false;

  return useQuery({
    queryKey: ["userBankCard", userId],
    queryFn: () => getUserBankCardsByUserId(userId),
    enabled: isUserId,
  });
};
