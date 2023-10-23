import { getRolesByDiscoId } from "@/services/getRolesByDiscoId";
import { useQuery } from "@tanstack/react-query";

export const useGetRolesByIdDisco = (discoId: string) => {
  return useQuery({
    queryKey: ["rolesByDiscoId", discoId],
    queryFn: () => getRolesByDiscoId(discoId),
  });
};
