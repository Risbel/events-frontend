import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICombo } from "@/services/getCombosByDiscoId";
import { Edit } from "lucide-react";
import EditComboForm from "../forms/EditComboForm";

const EditCombo = ({ combo }: { combo: ICombo }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Edit />
      </DialogTrigger>
      <DialogContent className="h-2/3 w-2/3">
        <DialogHeader>
          <DialogTitle className="p-4">Panel to edit Combo</DialogTitle>
          <div className="flex w-full justify-center">
            <EditComboForm combo={combo} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditCombo;
