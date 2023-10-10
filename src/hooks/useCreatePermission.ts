import addPermission from '@/services/addPermission'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCreatePermission = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: data => addPermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  return { mutate, isLoading }
}

export default useCreatePermission
