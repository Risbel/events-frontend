import { addBannerImages } from "@/services/addBannerImages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddBannerImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBannerImages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerImages"] });
    },
  });
};
