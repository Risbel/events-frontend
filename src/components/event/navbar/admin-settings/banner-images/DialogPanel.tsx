import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddBannerImagesForm from "./AddBannerImagesForm";
import { DiscoDetail } from "@/services/getDisco";
import BannerImages from "./BannerImages";
import { GalleryThumbnailsIcon } from "lucide-react";

const DialogPanel = ({ discoDetail }: { discoDetail: DiscoDetail }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 px-2 py-1 hover:bg-black rounded-sm w-full transition-colors">
        <GalleryThumbnailsIcon height={20} width={20} />{" "}
        <span className="text-start text-sm hover:text-white">Banner images</span>
      </DialogTrigger>
      <DialogContent className="h-5/6 w-full md:w-3/5 lg:w-3/5 text-left backdrop-blur-xl">
        <div className="flex h-full p-2 flex-col gap-4">
          <div>
            <h2 className="text-2xl pb-4 text-center">Banner images</h2>
          </div>
          <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
            <AddBannerImagesForm discoDetailId={discoDetail.id} />
            <BannerImages discoDetailId={discoDetail.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPanel;
