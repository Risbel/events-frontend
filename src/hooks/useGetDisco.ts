import getDisco from "@/services/getDisco";
import { useQuery } from "@tanstack/react-query";

const useGetDisco = (data: { name: string; userId: string | undefined }) => {
  const isUserId = data.userId ? true : false;
  const isName = data.name ? true : false;

  return useQuery({
    queryKey: ["discoBySlug", data],
    queryFn: () => getDisco(data),
    enabled: isUserId || isName,
  });
};

export default useGetDisco;
