import DashboardLayout from "@/components/layouts/DashboardLayout";

import { useRouter } from "next/router";
import UserContainer from "./components/UserContainer";

const UserDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { userId } = query;

  return (
    <DashboardLayout>
      <UserContainer id={userId} />
    </DashboardLayout>
  );
};

export default UserDetail;
