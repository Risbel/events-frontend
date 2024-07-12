import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { INotifications } from "@/services/getNotificationsByEventId";
import { Edit } from "lucide-react";
import EditNotificationForm from "./EditNotificationForm";

const EditNotification = ({ notification }: { notification: INotifications }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Edit height={20} width={20} />
      </DialogTrigger>
      <DialogContent className="h-2/3 w-2/3">
        <DialogHeader>
          <DialogTitle className="p-4">Panel to edit Notification</DialogTitle>
          <div className="flex w-full justify-center">
            <EditNotificationForm notification={notification} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditNotification;
