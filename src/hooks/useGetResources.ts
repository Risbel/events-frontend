import { getResources } from '@/services/getResources'
import { useQuery } from '@tanstack/react-query'

const useGetResources = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['resources'],
    queryFn: () => getResources(),
  })

  return { data, isLoading }
}

export default useGetResources
