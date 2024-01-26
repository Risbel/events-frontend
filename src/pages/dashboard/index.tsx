import HomeLayout from "@/components/layouts/HomeLayout";
import NavbarDashboard from "@/components/navigation/NavbarDashboard";

const index = () => {
  return (
    <HomeLayout>
      <NavbarDashboard />
      <div></div>
    </HomeLayout>
  );
};

export default index;
