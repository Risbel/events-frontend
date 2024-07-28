import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteEvent } from "@/hooks/useDeleteEvent";
import { AlertTriangle, CheckCircle2, Loader2Icon, Trash2 } from "lucide-react";

const DeleteEvent = ({ id }: { id: string }) => {
  const { mutate, isLoading, isSuccess } = useDeleteEvent();

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 className="hover:scale-105" stroke="#ffffff" />
      </DialogTrigger>
      <DialogContent className="h-1/3 w-1/3 py-8 px-4">
        <div className="flex flex-col items-center w-full h-full justify-around">
          <AlertTriangle height={40} width={40} stroke="orange" />
          <p className="text-xl font-semibold text-center">Are you sure you want to delete this event?</p>
          <div className="flex gap-4">
            <Button onClick={() => mutate(id)} type="button" variant={"destructive"}>
              {isLoading ? (
                <Loader2Icon className="animate-spin" stroke="white" />
              ) : isSuccess ? (
                <CheckCircle2 />
              ) : (
                <span>Yes</span>
              )}
            </Button>
            <DialogClose className="border px-4 rounded-lg bg-primary text-white hover:opacity-90">No</DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEvent;
