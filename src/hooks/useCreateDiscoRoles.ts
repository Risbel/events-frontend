import createDiscoRoles from "@/services/createDiscoRoles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateDiscoRoles = () => {
  const queryClient = useQueryClient();

  const {
    mutate: submitDiscoRole,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: createDiscoRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoRoles"] });
    },
  });

  return { submitDiscoRole, isLoading, isSuccess };
};

export default useCreateDiscoRoles;
