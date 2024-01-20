import { useGetBannerImages } from "@/hooks/useGetBannerImages";
import { DiscoDetail } from "@/services/getDisco";
import Image from "next/image";

const BannerImages = ({ discoDetails }: { discoDetails: DiscoDetail }) => {
  const { data } = useGetBannerImages(discoDetails.id);

  return (
    <div className="h-screen flex items-center overflow-hidden absolute -z-10">
      <div className="absolute w-screen h-full"></div>
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
