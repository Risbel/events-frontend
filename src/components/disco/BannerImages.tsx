import { useGetBannerImages } from "@/hooks/useGetBannerImages";
import Image from "next/image";

const BannerImages = ({ discoDetailsId }: { discoDetailsId: string }) => {
  const { data } = useGetBannerImages(discoDetailsId);

  return (
    <div className="max-h-96 flex items-center overflow-hidden absolute -z-10">
      <div className="absolute h-96 w-screen bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      {data &&
        data?.map((img) => (
          <Image
            className="w-screen object-cover"
            src={img.image}
            alt={img.alt}
            key={img.id}
            width={1000}
            height={300}
          />
        ))}
    </div>
  );
};

export default BannerImages;
