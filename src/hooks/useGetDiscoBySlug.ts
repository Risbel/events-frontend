import { getDiscoBySlug } from "@/services/getDiscoBySlug";
import { useQuery } from "@tanstack/react-query";

export const useGetDiscoBySlug = (slug: any) => {
  const isSlug = slug ? true : false;

  return useQuery({
    queryKey: ["discoBySlug", slug],
    queryFn: () => getDiscoBySlug(slug),
    enabled: isSlug,
  });
};
