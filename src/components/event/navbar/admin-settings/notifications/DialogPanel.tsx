import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddNotification from "./AddNotification";
import Notifications from "./Notifications";

const DialogPanel = ({ discoId }: { discoId: string }) => {
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
            <AddNotification eventId={discoId} />
            <Notifications discoId={discoId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPanel;
