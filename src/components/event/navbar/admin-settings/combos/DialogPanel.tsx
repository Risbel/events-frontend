import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingBag, X } from "lucide-react";
import React from "react";
import CombosList from "./CombosList";
import AddCombosForm from "@/components/details-ticket/AddCombosForm";

const DialogPanel = ({ discoId }: { discoId: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 px-2 py-1 hover:bg-black rounded-sm w-full transition-colors">
        <ShoppingBag height={20} width={20} /> <span className="text-start text-sm hover:text-white">Packs</span>
      </DialogTrigger>
      <DialogContent className="w-11/12 h-3/4 p-8">
        <DialogHeader>
          <DialogTitle>Packs</DialogTitle>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4">
          <X />
        </DialogClose>
        <div className="h-full overflow-hidden overflow-y-scroll">
          <CombosList discoId={discoId} />
          <AddCombosForm discoId={discoId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPanel;
