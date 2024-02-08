import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddDiscos from "./components/AddDiscos";

const WorkSpace = () => {
  return (
    <DashboardLayout>
      <div className="relative">
        <AddDiscos />
      </div>
    </DashboardLayout>
  );
};

export default WorkSpace;
