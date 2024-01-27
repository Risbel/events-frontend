import AddDiscos from "@/components/forms/AddDiscos";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const WorkSpace = () => {
  return (
    <DashboardLayout>
      <div className="pt-16 px-8">
        <AddDiscos />
      </div>
    </DashboardLayout>
  );
};

export default WorkSpace;
