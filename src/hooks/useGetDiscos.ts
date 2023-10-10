import { getDiscos } from "@/services/getDiscos";
import { useQuery } from "@tanstack/react-query";

export const useGetDiscos = () => {
  return useQuery({
    queryKey: ["discos"],
    queryFn: getDiscos,
  });
};
