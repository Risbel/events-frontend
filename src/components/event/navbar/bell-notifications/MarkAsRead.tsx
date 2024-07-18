import { useEditNotificationStatus } from "@/hooks/useEditNotificationStatus";
import { ISubscriptionNotifications } from "@/services/getNotificationsByUserEvent";
import { CheckCircle2, Loader2, Mail, MailOpen, MailOpenIcon } from "lucide-react";
import React from "react";

const MarkAsRead = ({ sub }: { sub: ISubscriptionNotifications }) => {
  const { mutate, isLoading, isSuccess } = useEditNotificationStatus();

  const notificationId = sub.eventNotificationId;

  return (
    <button onClick={() => mutate(notificationId)} className="flex gap-2">
      {isLoading ? (
        <Loader2 height={20} width={20} />
      ) : isSuccess ? (
        <CheckCircle2 height={20} width={20} />
      ) : sub.isRead ? (
        <MailOpenIcon height={20} width={20} />
      ) : (
        <Mail height={20} width={20} />
      )}
      {!sub.isRead ? <span>Mark as read</span> : <span>Desmark as read</span>}
    </button>
  );
};

export default MarkAsRead;
