import NavbarEvent from "@/components/event/navbar/NavbarEvent";
import useGetDisco from "@/hooks/useGetDisco";
import { useGetNotificationsByEventId } from "@/hooks/useGetNotificationsByEventId";
import { useSession } from "next-auth/react";

const Notifications = () => {
  return (
    <>
      <NavbarEvent />

      <div className="pt-16 px-4 md:px-8 h-full pb-16">
        <h1 className=" text-2xl mb-2 text-center font-semibold">Notifications</h1>
      </div>
    </>
  );
};

export default Notifications;
