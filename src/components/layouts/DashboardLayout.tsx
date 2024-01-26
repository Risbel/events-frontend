import NavbarDashboard from "../navigation/NavbarDashboard";
import Sidebar from "../navigation/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-screen h-screen">
      <NavbarDashboard />
      <div className="h-screen flex">
        <Sidebar />
        <div className="w-full h-full z-20 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
