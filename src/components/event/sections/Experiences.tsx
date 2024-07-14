import { DiscoDetail } from "@/services/getDisco";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

const Experiences = ({ discoDetail }: { discoDetail: DiscoDetail }) => {
  return (
    <div
      style={{
        background: `${discoDetail.discoColor.bgExperiencies}`,
      }}
      className="flex flex-col items-center justify-center relative overflow-hidden h-screen"
    >
      <h1
        style={{ color: `${discoDetail.discoColor.experienciesH1Color}` }}
        className="font-extrabold text-4xl md:text-5xl lg:text-7xl py-8 text-center relative z-20"
      >
        {discoDetail.titleTextCarousel ? discoDetail.titleTextCarousel : "Experiencies"}
      </h1>

      <div className="flex justify-between w-full relative z-20">
        <div
          style={{ borderColor: `${discoDetail.discoColor.experienciesH1Color}` }}
          className="border-4 w-3/5 rounded-r-full"
        />
        <div
          style={{ borderColor: `${discoDetail.discoColor.experienciesH1Color}` }}
          className="border-4 w-1/4 rounded-l-full"
        />
      </div>

      <div className="absolute -z-10 h-20 w-20 bg-white rounded-full blur-3xl top-28" />
      <div className="relative z-20 px-4 py-12">
        <Carousel className="w-full max-w-7xl">
          <CarouselContent>
            {discoDetail?.discoImages?.map(
              (discoImage, index) =>
                discoImage && (
                  <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/4">
                    <div
                      style={{
                        borderRadius: "20px",
                        border: `solid 3px`,
                        borderColor: `${discoDetail.discoColor.experienciesH1Color}`,
                      }}
                      className="relative mb-4 overflow-hidden"
                    >
                      <p className="bg-gradient-to-t from-black via-black/60 to-transparent  absolute text-center w-full text-white text-xs md:text-md font-light bottom-0">
                        {discoImage?.imageText}
                      </p>
                      <Image
                        className="object-cover h-72 w-full rounded-2xl"
                        src={discoImage.image}
                        width={400}
                        height={400}
                        alt={`experiencie${discoImage.id}`}
                      />
                    </div>
                  </CarouselItem>
                )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="absolute rounded-full z-10 h-80 w-80 blur-3xl opacity-70 right-32 bottom-0 -translate-y-1/3 bg-white/50"></div>

      <div className="flex justify-between w-full mb-12 relative z-20">
        <div
          style={{ borderColor: `${discoDetail.discoColor.experienciesH1Color}` }}
          className="border-4 w-1/4 rounded-r-full"
        />
        <div
          style={{ borderColor: `${discoDetail.discoColor.experienciesH1Color}` }}
          className="border-4 w-3/5 rounded-l-full"
        />
      </div>
    </div>
  );
};

export default Experiences;
