import NavbarDashboard from "../dashboard/NavbarDashboard";
import Sidebar from "../dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-screen h-screen">
      <NavbarDashboard />
      <div className="h-screen flex">
        <Sidebar />
        <div className="w-full h-full z-20 overflow-y-scroll scroll-smooth">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
