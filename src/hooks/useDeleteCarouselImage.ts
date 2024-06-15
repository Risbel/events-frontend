import { deleteCarouselImage } from "@/services/deleteCarouselImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCarouselImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCarouselImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoBySlug"] });
    },
  });
};
