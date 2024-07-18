import React from "react";
import NotificationCard from "./NotificationCard";
import { useGetNotificationsByEventId } from "@/hooks/useGetNotificationsByEventId";

const Notifications = ({ discoId }: { discoId: string }) => {
  const { data, isLoading } = useGetNotificationsByEventId(discoId, 1, 20);

  if (!data) {
    return;
  }
  return (
    <div className="flex flex-col gap-4">
      {!data?.length && (
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <p className="text-black text-center">Nothing to show</p>
        </div>
      )}
      {data.map((notification) => {
        return <NotificationCard key={notification.id} notification={notification} />;
      })}
    </div>
  );
};

export default Notifications;
