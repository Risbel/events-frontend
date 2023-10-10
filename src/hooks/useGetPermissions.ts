import { getPermissions } from '@/services/getPermissions'
import { useQuery } from '@tanstack/react-query'

const useGetPermissions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['permissions'],
    queryFn: () => getPermissions(),
  })

  return { data, isLoading }
}

export default useGetPermissions
