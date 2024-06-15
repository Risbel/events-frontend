import { createCarouselImages } from "@/services/createCarouselImages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCarouselImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCarouselImages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoBySlug"] });
    },
  });
};
