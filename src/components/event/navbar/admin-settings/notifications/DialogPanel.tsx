import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddNotification from "./AddNotification";
import Notifications from "./Notifications";
import { BellDotIcon } from "lucide-react";

const DialogPanel = ({ discoId }: { discoId: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2  px-2 py-1 hover:bg-black rounded-sm w-full transition-colors">
        <BellDotIcon height={20} width={20} /> <span className="text-sm hover:text-white">Notifications</span>
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
