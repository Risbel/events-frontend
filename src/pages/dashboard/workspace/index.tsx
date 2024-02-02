import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddDiscos from "./components/AddDiscos";

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
