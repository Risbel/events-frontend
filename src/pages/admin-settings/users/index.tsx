import EventLayout from "@/components/layouts/EventLayout";
import UsersContainer from "./components/UsersContainer";

const Users = () => {
  return (
    <EventLayout>
      <div className="pt-20 px-6 md:px-16">
        <UsersContainer />
      </div>
    </EventLayout>
  );
};

export default Users;
