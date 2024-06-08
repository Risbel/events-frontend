import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ICombo } from "@/services/getCombosByDiscoId";
import { AlertTriangle, Loader2Icon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDeleteTicket } from "@/hooks/useDeleteTicket";

const DeleteTicket = ({ idTicket }: { idTicket: string }) => {
  const { mutate, isLoading, isSuccess } = useDeleteTicket();

  const deleteTicket = (id: string) => {
    mutate(id);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 />
      </DialogTrigger>
      <DialogContent className="h-1/3 w-1/3 py-8 px-4">
        <div className="flex flex-col items-center w-full h-full justify-around">
          <AlertTriangle height={40} width={40} stroke="orange" />
          <p className="text-xl font-semibold text-center">Are you sure you want to delete this ticket?</p>
          <div className="flex gap-4">
            <Button onClick={() => deleteTicket(idTicket)} type="button" variant={"destructive"}>
              {isLoading ? <Loader2Icon className="animate-spin" stroke="white" /> : <span>Yes</span>}
            </Button>
            <DialogClose>
              <Button type="button" variant={"outline"} className="border-black">
                No
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTicket;
