import { getAdmisionByIdDisco } from '@/services/getAdmisionByIdDisco'
import { useQuery } from '@tanstack/react-query'

export const useGetAdmisionsByIdDisco = (discoId: string | undefined) => {
  const isDiscoId = discoId ? true : false

  return useQuery({
    queryKey: ['discoAdmisions', discoId],
    queryFn: () => {
      if (discoId) {
        return getAdmisionByIdDisco(discoId)
      }
    },
    enabled: isDiscoId
  })
}
