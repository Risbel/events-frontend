import getDisco from '@/services/getDisco'
import { useQuery } from '@tanstack/react-query'

const useGetDisco = (data: { name: string; userId: string | undefined }) => {
  const isUserId = data.userId ? true : false

  return useQuery({
    queryKey: ['discoBySlug', data],
    queryFn: () => getDisco(data),
    enabled: isUserId
  })
}

export default useGetDisco
