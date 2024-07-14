import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle2, Loader2Icon, Trash2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { INotifications } from "@/services/getNotificationsByEventId";
import { useDeleteNotification } from "@/hooks/useDeleteNotification";

const DeleteNotification = ({ notification }: { notification: INotifications }) => {
  const { id } = notification;
  const { mutate, isLoading, isSuccess } = useDeleteNotification();

  const deleteNotification = (id: string) => {
    mutate(id);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 width={20} height={20} />
      </DialogTrigger>
      <DialogContent className="h-1/3 w-1/3 py-8 px-4">
        <div className="flex flex-col items-center w-full h-full justify-around">
          <AlertTriangle height={40} width={40} stroke="orange" />
          <p className="text-xl font-semibold text-center">Are you sure you want to delete this Notification?</p>
          <div className="flex gap-4">
            <Button onClick={() => deleteNotification(id)} type="button" variant={"destructive"}>
              {isLoading ? (
                <Loader2Icon className="animate-spin" stroke="white" />
              ) : isSuccess ? (
                <CheckCircle2 />
              ) : (
                <span>Yes</span>
              )}
            </Button>
            <DialogClose className="border px-4 rounded-lg bg-primary text-white hover:opacity-90">No</DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNotification;
