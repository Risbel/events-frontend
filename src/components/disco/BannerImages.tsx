import { useGetBannerImages } from "@/hooks/useGetBannerImages";
import Image from "next/image";

const BannerImages = ({ discoDetailsId }: { discoDetailsId: string }) => {
  const { data } = useGetBannerImages(discoDetailsId);

  return (
    <div className="h-screen flex items-center overflow-hidden absolute -z-10">
      <div className="absolute w-screen h-full bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      {data &&
        data?.map((img) => (
          <Image
            className="w-screen h-screen object-cover"
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
