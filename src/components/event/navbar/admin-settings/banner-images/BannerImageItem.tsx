import { useDeleteBannerImage } from "@/hooks/useDeleteBannerImage";
import { Loader2, Trash2Icon } from "lucide-react";
import React from "react";

const BannerImageItem = ({ image }: { image: any }) => {
  const { mutate: deleteBannerImage, isLoading } = useDeleteBannerImage();

  return (
    <div className="relative">
      <img className="rounded-xl h-full w-full" width={300} height={200} src={image.image} alt="banner image" />

      <button
        onClick={() => deleteBannerImage(image.id)}
        className="absolute right-4 bottom-4 bg-primary p-2 rounded-full group"
      >
        {isLoading ? (
          <Loader2 className="animate-spin stroke-white" />
        ) : (
          <Trash2Icon className="stroke-white group-hover:scale-105" />
        )}
      </button>
    </div>
  );
};

export default BannerImageItem;
