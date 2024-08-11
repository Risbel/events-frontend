import AddDiscos from "@/components/dashboard/workspace";
import DashboardLayout from "@/components/layouts/DashboardLayout";

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
