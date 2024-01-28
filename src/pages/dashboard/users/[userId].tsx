import DashboardLayout from "@/components/layouts/DashboardLayout";
import UserContainer from "@/pages/admin-settings/users/components/UserContainer";

import { useRouter } from "next/router";

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
