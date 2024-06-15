import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Loader2Icon, Trash2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCarouselImage } from "@/hooks/useDeleteCarouselImage";
import { DiscoImages } from "@/services/getDisco";

const DeleteCArouselImage = ({ carouselImage }: { carouselImage: DiscoImages }) => {
  const { id } = carouselImage;
  const { mutate, isLoading, isSuccess } = useDeleteCarouselImage();

  const deleteCarouselImage = (id: string) => {
    mutate(id);
  };

  return (
    <Dialog>
      <DialogTrigger className="absolute right-4 bottom-4 bg-primary rounded-full p-2 shadow-md group">
        <Trash2 className="stroke-white group-hover:scale-105" />
      </DialogTrigger>
      <DialogContent className="h-1/3 w-full md:w-1/3 py-8 px-4">
        <div className="flex flex-col items-center w-full h-full justify-around">
          <AlertTriangle height={40} width={40} stroke="orange" />
          <p className="text-xl font-semibold text-center">Are you sure you want to delete this image?</p>
          <div className="flex gap-4">
            <Button onClick={() => deleteCarouselImage(id)} type="button" variant={"destructive"}>
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

export default DeleteCArouselImage;
