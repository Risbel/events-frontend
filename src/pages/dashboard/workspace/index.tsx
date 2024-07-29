import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddDiscos from "../../../components/dashboard/workspace/AddDiscos";

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
