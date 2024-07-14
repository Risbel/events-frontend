import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";
import Image from "next/image";

const experiencies = [
  {
    id: 1,
    image: "/img-random.png",
    imageText: "example text",
  },
  {
    id: 2,
    image: "/img-random.png",
    imageText: "example text",
  },
  {
    id: 3,
    image: "/img-random.png",
    imageText: "example text",
  },
  {
    id: 4,
    image: "/img-random.png",
    imageText: "example text",
  },
  {
    id: 4,
    image: "/img-random.png",
    imageText: "example text",
  },
  {
    id: 4,
    image: "/img-random.png",
    imageText: "example text",
  },
];

const ExperiencesPreview = ({ values }: { values: AddDiscoSchema }) => {
  return (
    <div
      id="3"
      style={{
        background: `${values.bgExperiencies}`,
      }}
      className="flex flex-col items-center justify-center relative overflow-hidden h-screen"
    >
      <h1
        style={{ color: `${values.experienciesH1Color}` }}
        className="font-extrabold text-3xl md:text-4xl lg:text-6xl py-8 text-center"
      >
        {values.titleTextCarousel ? values.titleTextCarousel : "Experiencies"}
      </h1>

      <div className="flex justify-between w-full">
        <div style={{ borderColor: `${values.experienciesH1Color}` }} className="border-4 w-3/5 rounded-r-full" />
        <div style={{ borderColor: `${values.experienciesH1Color}` }} className="border-4 w-1/4 rounded-l-full" />
      </div>

      <div className="absolute -z-10 h-20 w-20 bg-white rounded-full blur-3xl top-28" />
      <div className="relative z-20 py-12">
        <Carousel className="max-w-xs md:max-w-md lg:max-w-5xl">
          <CarouselContent>
            {experiencies.map(
              (discoImage, index) =>
                discoImage && (
                  <CarouselItem key={index} className="lg:w-full md:basis-1/2 lg:basis-1/4">
                    <div
                      style={{
                        borderRadius: "20px",
                        border: `solid 3px`,
                        borderColor: `${values.experienciesH1Color}`,
                      }}
                      className="relative mb-4 overflow-hidden"
                    >
                      <p className="bg-gradient-to-t from-black via-black/60 to-transparent  absolute text-center w-full text-white text-xs md:text-md font-light bottom-0">
                        {discoImage?.imageText}
                      </p>
                      <Image
                        className="object-cover rounded-2xl w-full h-full"
                        src={discoImage.image}
                        width={350}
                        height={400}
                        alt={`experiencie${discoImage.id}`}
                      />
                    </div>
                  </CarouselItem>
                )
            )}
          </CarouselContent>
          <CarouselPrevious className="flex" />
          <CarouselNext className="flex" />
        </Carousel>
      </div>

      <div className="absolute rounded-full z-10 h-80 w-80 blur-3xl opacity-70 right-32 bottom-0 -translate-y-1/3 bg-white/50"></div>

      <div className="flex justify-between w-full mb-12">
        <div style={{ borderColor: `${values.experienciesH1Color}` }} className="border-4 w-1/4 rounded-r-full" />
        <div style={{ borderColor: `${values.experienciesH1Color}` }} className="border-4 w-3/5 rounded-l-full" />
      </div>
    </div>
  );
};

export default ExperiencesPreview;
