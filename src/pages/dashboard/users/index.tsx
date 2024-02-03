import DashboardLayout from "@/components/layouts/DashboardLayout";
import UsersContainer from "./components/UsersContainer";

const Users = () => {
  return (
    <DashboardLayout>
      <div className="pt-16">
        <UsersContainer />
      </div>
    </DashboardLayout>
  );
};

export default Users;
