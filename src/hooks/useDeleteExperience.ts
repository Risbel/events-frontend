import { deleteExperience } from "@/services/deleteExperience";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["discoBySlug"]);
    },
  });
};
