import useGetResourcesByPermissionId from '@/hooks/useGetResourcesByPermissionId'

const Resources = ({
  discoRoleId,
  permissionId,
}: {
  discoRoleId: string
  permissionId: string
}) => {
  const { isLoading, data, isError, error } = useGetResourcesByPermissionId(
    discoRoleId,
    permissionId
  )

  if (isError && error) {
    return <div>We have had a problem, please try again later.</div>
  }

  if (isLoading) {
    return (
      <div className="flex">
        <div className="bg-purple-700/30 px-2 py-1 rounded-md text-xs">
          loading...
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {data &&
        data.map(resource => (
          <div
            key={resource.id}
            className="bg-purple-700/70 px-2 py-1 rounded-md text-xs"
          >
            {resource.Resource.name}
          </div>
        ))}
    </div>
  )
}

export default Resources
