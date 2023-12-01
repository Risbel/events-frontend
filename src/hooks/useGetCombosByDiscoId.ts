import { getCombosByDiscoId } from "@/services/getCombosByDiscoId";
import { useQuery } from "@tanstack/react-query";

export const useGetCombosByDiscoId = (discoId: string) => {
  return useQuery({
    queryKey: ["combosByDiscoId", discoId],
    queryFn: () => getCombosByDiscoId(discoId),
  });
};
