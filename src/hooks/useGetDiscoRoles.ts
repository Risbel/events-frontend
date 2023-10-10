import { getDiscoRoles } from '@/services/getDiscoRoles'
import { useQuery } from '@tanstack/react-query'

export const useGetDiscoRoles = () => {
  return useQuery({
    queryKey: ['discoRoles'],
    queryFn: getDiscoRoles,
  })
}
