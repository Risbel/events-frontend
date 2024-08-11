import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye, X } from "lucide-react";

import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import Preview from "./Preview";

const DialogPreview = ({ values }: { values: AddDiscoSchema }) => {
  return (
    <Dialog>
      <DialogTrigger className="fixed top-16 right-8 p-2 bg-primary/90 rounded-full hover:scale-105 transition-transform">
        <Eye stroke="#ffffff" />
      </DialogTrigger>
      <DialogContent className="h-screen w-screen overflow-hidden">
        <DialogClose className="fixed right-4 top-4 z-[200] hover:scale-105 bg-primary/90 p-2 rounded-full">
          <X className="stroke-white" />
        </DialogClose>
        <Preview values={values} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogPreview;
