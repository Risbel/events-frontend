import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddCombosForm from "@/components/details-ticket/AddCombosForm";
import { DataDisco } from "@/services/getDisco";

import { X } from "lucide-react";
import CombosList from "./CombosList";

const AddCombos = ({ disco }: { disco: DataDisco }) => {
  return (
    <Dialog>
      <DialogTrigger className="text-start text-sm px-2 py-1 hover:bg-black hover:text-white rounded-sm w-full transition-colors">
        Packs
      </DialogTrigger>
      <DialogContent className="w-11/12 h-3/4 p-8">
        <DialogHeader>
          <DialogTitle>Packs</DialogTitle>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4">
          <X />
        </DialogClose>
        <div className="h-full overflow-hidden overflow-y-scroll">
          <CombosList discoId={disco.id} />
          <AddCombosForm discoId={disco.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCombos;
