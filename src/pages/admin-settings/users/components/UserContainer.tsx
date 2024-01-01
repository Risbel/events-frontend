import useGetUserById from "@/hooks/useGetUserById";
import Spinner from "@/components/loaders/Spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import UpdateRoleForm from "@/components/forms/UpdateRoleForm";

const UserContainer = ({ id }: { id: any }) => {
  const { isLoading, data } = useGetUserById(id);

  if (isLoading && !data) {
    return (
      <div className="flex justify-center">
        <Spinner diameter={10} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Avatar>
          {!data?.imageUrl ? (
            <div className="bg-zinc-200 rounded-full flex justify-center items-center w-full">
              <span className="text-md font-bold text-black">{data?.name && data.name[0]}</span>
            </div>
          ) : (
            <div className="rounded-full overflow-hidden h-full w-full bg-slate-300">
              {data.imageUrl && <AvatarImage src={data.imageUrl} />}
            </div>
          )}
        </Avatar>
        <h1 className="text-white text-2xl">
          {data?.name} {data?.lastName}
        </h1>
      </div>

      <div className="py-4">
        <h2 className="text-white text-xl font-thin bg-blue-900/20 pb-2">Personal dates:</h2>
        <p className="text-white">Email: {data?.phone}</p>
        <p className="text-white">Phone: {data?.email}</p>
        <p className="text-white">Joined: {data?.createdAt?.slice(0, 10)}</p>
      </div>

      <div className="py-4">
        <h2 className="text-white text-xl font-thin bg-blue-900/20 pb-2 mb-2">Subscriptions:</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.subscriptions.map((subscription) => {
            return (
              <div
                key={subscription.id}
                className="flex gap-2 items-center justify-between pr-1 bg-blue-800/40 hover:bg-blue-700/50 rounded-l-full "
              >
                <Avatar>
                  <AvatarImage src={subscription.Disco.logo} />
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-xl text-white">{subscription.Disco.name}</p>
                  <p className="text-xs text-white">Role: {subscription.DiscoRole.name}</p>
                </div>
                <UpdateRoleForm discoId={subscription.discoId} idSubscription={subscription.id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
