import useGetUserById from "@/hooks/useGetUserById";
import Spinner from "../loaders/Spinner";
import { Avatar, AvatarImage } from "../ui/avatar";

const UserContainer = ({ id }: { id: string }) => {
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
        <p className="text-white">Joined: {data?.createdAt}</p>
      </div>

      <div className="py-4">
        <h2 className="text-white text-xl font-thin bg-blue-900/20 pb-2">Subscriptions:</h2>
      </div>
    </div>
  );
};

export default UserContainer;
