import getDisco from "@/services/getDisco";
import { IApiError } from "@/types/react-query";
import { useQuery } from "@tanstack/react-query";

const useGetDisco = (data: { slug: any; userId?: any }) => {
  const isSlug = data?.slug ? true : false;

  return useQuery({
    queryKey: ["discoBySlug", data.slug, data.userId],
    queryFn: () => getDisco(data),
    enabled: isSlug,
    onError: (err: IApiError) => err,
  });
};

export default useGetDisco;
