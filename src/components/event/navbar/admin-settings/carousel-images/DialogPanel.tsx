import { DiscoDetail } from "@/services/getDisco";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddCarouselImageForm from "./AddCarouselImageForm";
import { GalleryHorizontal, X } from "lucide-react";
import CarouselImages from "./CarouselImages";

const AddCarouselImages = ({ discoDetail }: { discoDetail: DiscoDetail }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 px-2 py-1 hover:bg-black  rounded-sm w-full transition-colors">
        <GalleryHorizontal height={20} width={20} />
        <span className="text-start text-sm hover:text-white">Carousel images</span>
      </DialogTrigger>
      <DialogContent className="telative h-5/6 w-full md:w-3/5 lg:w-3/5 text-left backdrop-blur-xl">
        <DialogClose className="absolute top-4 right-4">
          <X />
        </DialogClose>
        <div className="flex h-full p-2 flex-col gap-4">
          <div>
            <h2 className="text-2xl pb-4 text-center">Carousel images</h2>
          </div>
          <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
            <AddCarouselImageForm discoDetailId={discoDetail.id} />
            <CarouselImages discoDetail={discoDetail} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarouselImages;
