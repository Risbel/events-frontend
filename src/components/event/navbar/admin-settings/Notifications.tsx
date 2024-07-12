import { DataDisco } from "@/services/getDisco";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetNotificationsByEventId } from "@/hooks/useGetNotificationsByEventId";
import AddNotification from "./AddNotification";
import NotificationCard from "./NotificationCard";

const Notifications = ({ disco }: { disco: DataDisco }) => {
  const { data, isLoading } = useGetNotificationsByEventId(disco.id, 1, 20);

  if (!data) {
    return;
  }

  return (
    <Dialog>
      <DialogTrigger className="text-start text-sm px-2 py-1 hover:bg-black hover:text-white rounded-sm w-full transition-colors">
        Notifications
      </DialogTrigger>
      <DialogContent className="h-5/6 w-full md:w-3/5 lg:w-3/5 text-left backdrop-blur-xl">
        <div className="flex h-full p-2 flex-col gap-4">
          <div>
            <h2 className="text-2xl pb-4 text-center">Notifications</h2>
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
            <AddNotification event={disco} />
            <div className="flex flex-col gap-4">
              {data.map((notification) => {
                return <NotificationCard key={notification.id} notification={notification} />;
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Notifications;
