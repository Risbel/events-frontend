import DashboardLayout from "@/components/layouts/DashboardLayout";
import MyEventsList from "./components/MyEventsList";

const AllEvents = () => {
  return (
    <DashboardLayout>
      <div className="pt-16 px-4 md:px-8 pb-10">
        <h1 className="text-xl md:text-2xl text-primary font-bold pb-4">My Events:</h1>
        <MyEventsList />
      </div>
    </DashboardLayout>
  );
};

export default AllEvents;
