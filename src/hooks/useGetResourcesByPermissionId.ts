import getResourcesByPermissionId from "@/services/getResourcesByPermissionId";
import { useQuery } from "@tanstack/react-query";

const useGetResourcesByPermissionId = (discoRoleId: string, permissionId: string) => {
  const isEnabled = discoRoleId && permissionId ? true : false;

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["resourcesByPermissionId", discoRoleId, permissionId],
    queryFn: () => getResourcesByPermissionId(discoRoleId, permissionId),
    enabled: isEnabled,
  });

  return { isLoading, data, isError, error };
};

export default useGetResourcesByPermissionId;
