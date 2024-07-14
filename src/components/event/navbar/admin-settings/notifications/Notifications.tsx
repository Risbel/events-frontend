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
      {data.map((notification) => {
        return <NotificationCard key={notification.id} notification={notification} />;
      })}
    </div>
  );
};

export default Notifications;
