import getResourcesByPermissionId from '@/services/getResourcesByPermissionId'
import { useQuery } from '@tanstack/react-query'

const useGetResourcesByPermissionId = (
  discoRoleId: string,
  permissionId: string
) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['resourcesByPermissionId', discoRoleId, permissionId],
    queryFn: () => getResourcesByPermissionId(discoRoleId, permissionId),
  })

  return { isLoading, data, isError, error }
}

export default useGetResourcesByPermissionId
