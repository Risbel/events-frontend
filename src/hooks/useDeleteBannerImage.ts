import { deleteBannerImages } from "@/services/deleteBannerImages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBannerImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBannerImages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerImages"] });
    },
  });
};
