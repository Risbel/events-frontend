import { createSubscription } from '@/services/createSubscription'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateSubscription = () => {
  const queryClient = useQueryClient()

  const { mutate: subscribe, isLoading } = useMutation({
    mutationFn: data => createSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries('discoBySlug')
    },
  })

  return { subscribe, isLoading }
}
