import useGetPermissionsByDiscoRole from '@/hooks/useGetPermissionsByDiscoRole'
import AddPermissionButton from '../buttons/AddPermissionButton'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import Resources from './Resources'

const PermissionsByDiscoRole = ({ roleId }: { roleId: string }) => {
  const {
    isLoading,
    data: permissions,
    error,
    isError,
  } = useGetPermissionsByDiscoRole(roleId)

  if (isError && error) {
    return <div>We have had a problem, please try again later.</div>
  }

  if (isLoading) {
    return <span>Squeleton...</span>
  }

  return (
    <div>
      <div className="flex gap-36 md:gap-x-44">
        <AddPermissionButton roleId={roleId} />
      </div>
      {permissions &&
        permissions.map(permission => (
          <div key={permission.permissionId}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="w-48">{permission.name}</TableCell>
                  <TableCell>
                    <Resources
                      discoRoleId={roleId}
                      permissionId={permission.permissionId}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))}
    </div>
  )
}

export default PermissionsByDiscoRole
