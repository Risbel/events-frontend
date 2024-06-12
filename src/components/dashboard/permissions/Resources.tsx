import { useDeleteRolePermissionResource } from "@/hooks/useDeleteRolePermissionResource";
import useGetResourcesByPermissionId from "@/hooks/useGetResourcesByPermissionId";
import Spinner from "../../loaders/Spinner";
import { XCircle } from "lucide-react";

const Resources = ({ discoRoleId, permissionId }: { discoRoleId: string; permissionId: string }) => {
  const {
    isLoading: isLoadingResources,
    data,
    isError,
    error,
  } = useGetResourcesByPermissionId(discoRoleId, permissionId);
  const { mutate, isLoading } = useDeleteRolePermissionResource();

  const handleDelete = (id: string) => {
    mutate(id);
  };

  if (isError && error) {
    return <div>We have had a problem, please try again later.</div>;
  }

  if (isLoadingResources) {
    return (
      <div className="flex">
        <div className="bg-purple-700/30 px-2 py-1 rounded-md text-xs">loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {data &&
        data.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md text-xs pl-2 pr-1 py-1"
          >
            <div>{resource.Resource.name}</div>
            <button onClick={() => handleDelete(resource.id)}>
              <XCircle className="hover:scale-105" height={20} />
            </button>
          </div>
        ))}
      {isLoading && <Spinner diameter={4} stroke={"white"} />}
    </div>
  );
};

export default Resources;
