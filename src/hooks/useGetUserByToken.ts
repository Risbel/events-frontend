import { getUserByToken } from "@/services/getUserByToken";
import { useQuery } from "@tanstack/react-query";

const useGetUserByToken = () => {
  return useQuery({
    queryKey: ["myself"],
    queryFn: () => getUserByToken(),

    cacheTime: 0,
  });
};

export default useGetUserByToken;
