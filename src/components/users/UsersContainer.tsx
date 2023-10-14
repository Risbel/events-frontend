import useGetUsers from "@/hooks/useGetUsers";
import Spinner from "../loaders/Spinner";
import UserTarget from "./UserTarget";

const UsersContainer = () => {
  const { isLoading, data } = useGetUsers();

  return (
    <div>
      <h1 className="text-2xl text-white pb-4">Users:</h1>
      <div className="w-full flex justify-center">{isLoading && !data && <Spinner />} </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data &&
          data.map((user) => (
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
