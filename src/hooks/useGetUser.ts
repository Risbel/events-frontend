import { getUserByToken } from "@/services/getUserByToken";
import { useQuery } from "@tanstack/react-query";

const useGetUser = (token: string) => {
  const isToken = token ? true : false;

  return useQuery({
    queryKey: ["myself"],
    queryFn: () => getUserByToken(token),
    enabled: isToken,
  });
};

export default useGetUser;
