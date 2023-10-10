import getPermissionsByDiscoRole from '@/services/getPermissionsByDiscoRole'
import { useQuery } from '@tanstack/react-query'

const useGetPermissionsByDiscoRole = (roleId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['permissionsByDiscoRoles', roleId],
    queryFn: () => getPermissionsByDiscoRole(roleId),
  })

  return { data, isLoading, isError, error }
}

export default useGetPermissionsByDiscoRole
