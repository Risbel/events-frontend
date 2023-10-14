import { getDiscos } from "@/services/getDiscos";
import { useQuery } from "@tanstack/react-query";

export const useGetDiscos = () => {
  const { data, isLoading, isFetched, isError } = useQuery({
    queryKey: ["discos"],
    queryFn: getDiscos,
  });

  return { data, isLoading, isFetched, isError };
};
