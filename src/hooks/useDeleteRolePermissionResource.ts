import { deleteRolePermissionResource } from "@/services/deleteRolePermissionResource";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRolePermissionResource = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteRolePermissionResource,
    onSuccess: () => {
      queryClient.invalidateQueries("resourcesByPermissionId");
    },
  });

  return { isLoading, mutate };
};
