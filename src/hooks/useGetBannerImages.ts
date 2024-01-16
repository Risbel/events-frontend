import { getBannerImages } from "@/services/getBannerImages";
import { useQuery } from "@tanstack/react-query";

export const useGetBannerImages = (discoDetailsId: string) => {
  let isDiscoDetailsId = discoDetailsId ? true : false;

  return useQuery({
    queryKey: ["bannerImages", discoDetailsId],
    queryFn: () => getBannerImages(discoDetailsId),
    enabled: isDiscoDetailsId,
  });
};
