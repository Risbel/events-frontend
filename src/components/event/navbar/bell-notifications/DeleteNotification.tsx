import { useDeleteNotificationSoft } from "@/hooks/useDeleteNotificationSoft";
import { CheckCircle2, Loader2, Trash2Icon } from "lucide-react";

const DeleteNotification = ({ notificationId }: { notificationId: string }) => {
  const { mutate, isLoading, isSuccess } = useDeleteNotificationSoft();

  return (
    <button onClick={() => mutate(notificationId)} className="flex gap-2">
      {isLoading ? (
        <Loader2 height={20} width={20} />
      ) : isSuccess ? (
        <CheckCircle2 height={20} width={20} />
      ) : (
        <Trash2Icon height={20} width={20} />
      )}
      <span>Delete</span>
    </button>
  );
};

export default DeleteNotification;
