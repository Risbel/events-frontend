import { cn } from "@/lib/shadcnUtils";
import { INotifications } from "@/services/getNotificationsByEventId";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import EditNotification from "./EditNotification";
import DeleteNotification from "./DeleteNotification";

const NotificationCard = ({ notification }: { notification: INotifications }) => {
  return (
    <div
      className={cn(
        notification.type === "info"
          ? "shadow-blue-800"
          : notification.type === "promo"
          ? "shadow-purple-500"
          : "shadow-orange-500",
        "rounded-xl shadow-md flex justify-between items-center overflow-hidden relative"
      )}
      key={notification.id}
    >
      <div className="flex flex-col items-start p-2">
        <p className="border-primary border-2 px-2 rounded-xl">Type: {notification.type}</p>
        <p className="font-semibold">{notification.title}</p>
        <p>{notification.description}</p>
        <p>Created at: {format(new Date(notification.createdAt), "dd-MM-yyyy")}</p>
        <p>Expiration date: {format(new Date(notification.expDate), "dd-MM-yyyy p")}</p>
      </div>
      <div className="flex justify-center items-center h-[100px] pr-10">
        {notification.image && (
          <Image
            className="h-full w-full object-cover rounded-md"
            src={notification.image}
            alt="notification img"
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 absolute right-2 top-1/4">
        <EditNotification notification={notification} />
        <DeleteNotification notification={notification} />
      </div>
    </div>
  );
};

export default NotificationCard;
