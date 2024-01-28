import EventLayout from "@/components/layouts/EventLayout";
import UserContainer from "./components/UserContainer";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const UserDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { userId } = query;

  return (
    <DashboardLayout>
      <div className="pt-20 px-6 md:px-16">
        <UserContainer id={userId} />
      </div>
    </DashboardLayout>
  );
};

export default UserDetail;
