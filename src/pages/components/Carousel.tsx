import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CardCarousel from "./CardCarousel";

const platformFeatures = [
  {
    title: "Development Agility",
    description: "Create virtual spaces quickly and efficiently, ideal for events with tight deadlines.",
  },
  {
    title: "Easy Customization",
    description: "Tailor virtual spaces effortlessly to meet specific event needs.",
  },
  {
    title: "Friendly Interface",
    description: "Intuitive and user-friendly form interface for easy autonomous management.",
  },
  {
    title: "Cost Reduction",
    description: "Automate web development processes to reduce hiring costs for developers.",
  },
  {
    title: "Scalability",
    description: "Simultaneously create multiple virtual spaces, perfect for diverse events.",
  },
  {
    title: "Swift Updates",
    description: "Facilitate quick content updates as event requirements evolve.",
  },
  {
    title: "E-commerce Integration",
    description: "Incorporate e-commerce features such as payment processing and order tracking.",
  },
  {
    title: "Enhanced User Experience",
    description: "Adapt the platform for an attractive and engaging user experience.",
  },
  {
    title: "Analysis and Tracking",
    description: "Integrated tools for data analysis and performance tracking.",
  },
  {
    title: "Multiple Device Compatibility",
    description: "Ensure seamless access from various devices and browsers.",
  },
];

const CarouselAdvantages = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full h-full"
    >
      <CarouselContent>
        {platformFeatures.map((feature, index) => (
          <CarouselItem key={index} className="flex basis md:basis-1/3 lg:basis-1/4 py-8">
            <CardCarousel title={feature.title} description={feature.description} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="flex bg-white/80 border-none" />
      <CarouselNext className="flex bg-white/80 border-none" />
    </Carousel>
  );
};

export default CarouselAdvantages;
