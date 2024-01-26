import EventLayout from "@/components/layouts/EventLayout";
import UserContainer from "./components/UserContainer";
import { useRouter } from "next/router";

const UserDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { userId } = query;

  return (
    <EventLayout>
      <div className="pt-20 px-6 md:px-16">
        <UserContainer id={userId} />
      </div>
    </EventLayout>
  );
};

export default UserDetail;
