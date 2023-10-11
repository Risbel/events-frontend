import getMyPermissionsOnDisco from "@/services/getMyPermissionsOnDisco";
import { useQuery } from "@tanstack/react-query";

const useGetMyPermissions = (userId: string, discoId: string) => {
  const isParams = userId && discoId ? true : false;

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["myPermissions", userId, discoId],
    queryFn: () => getMyPermissionsOnDisco(userId, discoId),
    enabled: isParams,
  });

  return { isLoading, isError, error, data };
};

export default useGetMyPermissions;
