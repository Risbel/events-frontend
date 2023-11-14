import { createExperience } from "@/services/createExperience";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    mutate: submitDataExperience,
  } = useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["discoBySlug"]);
    },
  });

  return { isLoading, isSuccess, submitDataExperience };
};
