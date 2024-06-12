import { useDeleteBannerImage } from "@/hooks/useDeleteBannerImage";
import { Loader2, Trash2Icon } from "lucide-react";
import React from "react";

const BannerImageItem = ({ image }: { image: any }) => {
  const { mutate: deleteBannerImage, isLoading } = useDeleteBannerImage();

  return (
    <div className="flex justify-between items-center place-items-start bg-secondary rounded-xl p-2">
      <div className="flex">
        <img className="rounded-xl" width={300} height={200} src={image.image} alt="banner image" />
        <p>{image?.alt}</p>
      </div>

      <button onClick={() => deleteBannerImage(image.id)} className="hover:scale-110 pr-8">
        {isLoading ? <Loader2 className="animate-spin" /> : <Trash2Icon className="hover:stroke-red-700" />}
      </button>
    </div>
  );
};

export default BannerImageItem;
