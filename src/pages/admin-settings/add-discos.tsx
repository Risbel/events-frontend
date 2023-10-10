import AddDiscos from "@/components/forms/AddDiscos";
import HomeLayout from "@/components/layouts/HomeLayout";

const AdminSettings = () => {
  return (
    <HomeLayout>
      <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center pt-24 px-2">
        <div className="col-span-2 md:col-start-2">
          <AddDiscos />
        </div>
      </div>
    </HomeLayout>
  );
};

export default AdminSettings;
