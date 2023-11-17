import HomeLayout from "@/components/layouts/HomeLayout";
import UsersContainer from "./components/UsersContainer";

const Users = () => {
  return (
    <HomeLayout>
      <div className="pt-20 px-6 md:px-16">
        <UsersContainer />
      </div>
    </HomeLayout>
  );
};

export default Users;
