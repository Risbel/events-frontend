import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BotIcon, X } from "lucide-react";

import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import Form from "./Form";

const DialogCopiloto = ({ values }: { values: AddDiscoSchema }) => {
  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-primary/90 rounded-full hover:scale-105 transition-transform">
        <BotIcon stroke="#ffffff" />
      </DialogTrigger>
      <DialogContent className="overflow-hidden overflow-y-scroll h-3/4 w-1/2">
        <DialogClose className="fixed right-4 top-4 z-[200] hover:scale-105 bg-primary/90 p-1 rounded-full">
          <X className="stroke-white" />
        </DialogClose>
        <div className="flex justify-center items-center gap-2 mb-8 py-4">
          <BotIcon />
          <h2 className="text-2xl font-bold text-center text-black">Copiloto</h2>
        </div>

        <Form values={values} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCopiloto;
