import useGetUsers from "@/hooks/useGetUsers";
import Spinner from "@/components/loaders/Spinner";
import UserTarget from "./UserTarget";
import { useGetMyUsers } from "@/hooks/useGetMyUsers";
import { useSession } from "next-auth/react";

const UsersContainer = () => {
  const { data, status } = useSession();
  const userId = data?.user.id;

  const { data: myUsers, isLoading } = useGetMyUsers(userId);

  if (isLoading && !myUsers) {
    return (
      <div className="flex justify-center items-center pt-24">
        <Spinner diameter={10} stroke={"black"} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl text-primary font-semibold pb-4">Users:</h1>
      <div className="w-full flex justify-center">
        {isLoading && !data && <Spinner diameter={10} stroke={"black"} />}{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myUsers &&
          myUsers.map((user) => (
            <div key={user.id}>
              <UserTarget
                id={user.id}
                imageUrl={user.imageUrl}
                name={user.name}
                lastName={user.lastName}
                phone={user.phone}
                email={user.email}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersContainer;
