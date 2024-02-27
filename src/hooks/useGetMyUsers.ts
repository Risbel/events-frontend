import { getMyUsers } from "@/services/getMyUsers";
import { useQuery } from "@tanstack/react-query";

export const useGetMyUsers = (userId: string | undefined) => {
  const isUserId = userId ? true : false;

  return useQuery({
    queryFn: () => getMyUsers(userId),
    queryKey: ["myUsers", userId],
    enabled: isUserId,
  });
};
