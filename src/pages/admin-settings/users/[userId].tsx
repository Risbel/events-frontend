import HomeLayout from "@/components/layouts/HomeLayout";
import UserContainer from "@/components/user/UserContainer";
import { useRouter } from "next/router";

const UserDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { userId } = query;

  return (
    <HomeLayout>
      <div className="pt-20 px-6 md:px-16">
        <UserContainer id={userId} />
      </div>
    </HomeLayout>
  );
};

export default UserDetail;
