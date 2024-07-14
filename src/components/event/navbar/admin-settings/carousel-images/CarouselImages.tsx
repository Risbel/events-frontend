import DeleteCArouselImage from "./DeleteCarouselImage";
import { DiscoDetail } from "@/services/getDisco";
import Image from "next/image";

const CarouselImages = ({ discoDetail }: { discoDetail: DiscoDetail }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {discoDetail.discoImages.map((image) => {
        return (
          <div className="relative bg-secondary rounded-xl" key={image.id}>
            <Image
              src={image.image}
              alt={image.imageText}
              width={150}
              height={150}
              className="object-cover rounded-md w-full h-[200px]"
            />

            <DeleteCArouselImage carouselImage={image} />
          </div>
        );
      })}
    </div>
  );
};

export default CarouselImages;
