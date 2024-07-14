import { useGetBannerImages } from "@/hooks/useGetBannerImages";
import BannerImageItem from "./BannerImageItem";

const BannerImages = ({ discoDetailId }: { discoDetailId: string }) => {
  const { data } = useGetBannerImages(discoDetailId);

  if (!data) {
    return;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {data.map((image) => {
        return <BannerImageItem image={image} key={image.id} />;
      })}
    </div>
  );
};

export default BannerImages;
