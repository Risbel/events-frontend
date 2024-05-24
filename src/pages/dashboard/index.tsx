import DashboardLayout from "@/components/layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-center items-center p-6 h-full">
        <p className="text-xl">
          Hi 👋, WELCOME TO MyEvents!! the place where you can build in minutes the perfect virtual place to cordinate
          your events online.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
