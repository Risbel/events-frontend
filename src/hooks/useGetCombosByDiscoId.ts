import { getCombosByDiscoId } from "@/services/getCombosByDiscoId";
import { useQuery } from "@tanstack/react-query";

export const useGetCombosByDiscoId = (discoId: string) => {
  const isDiscoId = discoId ? true : false;

  return useQuery({
    queryKey: ["combosByDiscoId", discoId],
    queryFn: () => getCombosByDiscoId(discoId),
    enabled: isDiscoId,
  });
};
