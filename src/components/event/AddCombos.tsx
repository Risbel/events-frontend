import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCombosForm from "@/pages/event/[slug]/details-ticket/[id]/components/AddCombosForm";
import { DataDisco } from "@/services/getDisco";
import CombosList from "./CombosList";
import { X } from "lucide-react";

const AddCombos = ({ disco }: { disco: DataDisco }) => {
  return (
    <Dialog>
      <DialogTrigger className="text-start text-sm px-2 py-1 hover:bg-black hover:text-white rounded-sm w-full transition-colors">
        Combos
      </DialogTrigger>
      <DialogContent className="w-11/12 h-3/4 p-8">
        <DialogHeader>
          <DialogTitle>Combos</DialogTitle>
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
