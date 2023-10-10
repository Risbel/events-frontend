import { getUserByToken } from '@/services/getUserByToken'
import { useQuery } from '@tanstack/react-query'

const useGetUser = (token: string) => {
  const isToken = token ? true : false

  return useQuery({
    queryKey: ['myself', token],
    queryFn: () => getUserByToken(token),
    enabled: isToken,
  })
}

export default useGetUser
