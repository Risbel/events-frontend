import useGetUserById from "@/hooks/useGetUserById";
import Spinner from "@/components/loaders/Spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import UpdateRoleForm from "@/components/forms/UpdateRoleForm";

const UserContainer = ({ id }: { id: any }) => {
  const { isLoading, data } = useGetUserById(id);

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center pt-24">
        <Spinner diameter={10} stroke={"black"} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 mt-12">
      <div className="flex gap-4 items-center">
        <Avatar>
          {!data?.imageUrl ? (
            <div className="rounded-full flex justify-center items-center bg-secondary h-12 w-12">
              <span className="text-md font-bold text-black">{data?.name && data.name[0]}</span>
            </div>
          ) : (
            <div className="rounded-full overflow-hidden h-10 w-10 bg-slate-300">
              {data.imageUrl && <AvatarImage src={data.imageUrl} />}
            </div>
          )}
        </Avatar>
        <h1 className="text-primary text-2xl">
          {data?.name} {data?.lastName}
        </h1>
      </div>

      <div className="py-4">
        <h2 className="text-primary font-semibold text-xl rounded-md bg-secondary py-2 pl-4">Personal dates:</h2>
        <p className="text-primary">Email: {data?.phone}</p>
        <p className="text-primary">Phone: {data?.email}</p>
        <p className="text-primary">Joined: {data?.createdAt?.slice(0, 10)}</p>
      </div>

      <div className="py-4">
        <h2 className="text-primary text-xl font-semibold bg-secondary py-2 pl-4 mb-4 rounded-md">
          Subscriptions & Roles:
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.subscriptions.map((subscription) => {
            return (
              <div
                key={subscription.id}
                className="flex gap-2 items-center justify-between pr-2 bg-secondary rounded-lg overflow-hidden"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={subscription.Disco.logo} />
                </Avatar>
                <div className="flex flex-col items-center">
                  <p className="text-xl text-primary">{subscription.Disco.name}</p>
                  <p className="text-xs text-primary">Role: {subscription.DiscoRole.name}</p>
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
