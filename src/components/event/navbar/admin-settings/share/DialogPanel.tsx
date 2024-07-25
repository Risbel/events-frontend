import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Share from "./Share";
import { DataDisco } from "@/services/getDisco";
import { Share2 } from "lucide-react";

const DialogPanel = ({ disco }: { disco: DataDisco }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 text-start text-sm px-2 py-1 hover:bg-black hover:text-white rounded-sm w-full transition-colors">
        <Share2 height={20} width={20} /> Share
      </DialogTrigger>
      <DialogContent className="h-5/6 w-full md:w-3/5 lg:w-3/5 text-left backdrop-blur-xl">
        <div className="flex h-full p-2 flex-col gap-4">
          <div>
            <h2 className="text-2xl pb-4 text-center">Share event</h2>
            <Share disco={disco} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPanel;
