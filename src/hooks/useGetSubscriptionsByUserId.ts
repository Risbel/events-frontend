import { getSubscriptionsById } from '@/services/getSubscriptionById'
import { useQuery } from '@tanstack/react-query'

export const useGetSubscriptionsByUserId = (id: string | undefined) => {
  const isUserId = id ? true : false

  return useQuery({
    queryKey: ['subscriptionsByUserId', id],
    queryFn: () => {
      if (id) {
        return getSubscriptionsById(id)
      }
    },
    enabled: isUserId,
  })
}
