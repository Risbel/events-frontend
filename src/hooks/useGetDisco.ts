import getDisco from "@/services/getDisco";
import { IApiError } from "@/types/react-query";
import { useQuery } from "@tanstack/react-query";

const useGetDisco = (data: { name: any; userId: any }) => {
  const isUserId = data?.userId ? true : false;
  const isName = data?.name ? true : false;

  return useQuery({
    queryKey: ["discoBySlug", data.name, data.userId],
    queryFn: () => getDisco(data),
    enabled: isUserId && isName,
    onError: (err: IApiError) => err,
  });
};

export default useGetDisco;
