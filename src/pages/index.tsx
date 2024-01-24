import HomeLayout from "@/components/layouts/HomeLayout";
import ButtonStart from "./components/ButtonStart";

import Link from "next/link";
import Image from "next/image";
import FormContact from "./components/FormContact";
import CarouselAdvantages from "./components/Carousel";

const Home = () => {
  return (
    <HomeLayout>
      <div className="relative h-screen flex justify-center items-center">
        <div className="z-10 absolute h-80 w-80 bg-secondary blur-3xl right-20"></div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className="relative z-20 flex flex-col items-center gap-6">
          <h1 className="text-secondary-foreground text-center text-3xl md:text-4xl lg:text-6xl font-extrabold w-4/5">
            <span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#000000,45%,#686868,55%,#000000)] bg-[length:250%_100%] bg-clip-text text-transparent">
              Create your virtual shop in minutes and turn events into unique experiences.
            </span>
          </h1>
          <h2 className="text-primary text-center text-md lg:text-2xl w-4/5">
            Manage every detail with ease, ensuring a seamless and memorable online experience. <br /> Discover a
            streamlined process for tailoring your virtual space effortlessly. <br />
          </h2>
          <ButtonStart />
        </div>
      </div>

      <div className="relative bg-primary">
        <div className="absolute inset-0 z-10 h-full w-full bg-primary bg-[linear-gradient(to_right,#bdbdbd1e_1px,transparent_1px),linear-gradient(to_bottom,#bdbdbd3c_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className="relative z-20 p-4 md:p-8 lg:p-20 h-full w-full">
          <h1 className="text-primary-foreground text-center text-4xl md:text-6xl lg:text-7xl font-bold">Advantages</h1>
          <div className="pt-4 lg:pt-8">
            <CarouselAdvantages />
          </div>
        </div>
      </div>

      <div className="relative bg-foreground">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex flex-wrap px-6 md:p-12 gap-8 md:w-1/2 lg:w-3/4">
            <div>
              <h3 className="text-white text-2xl font-semibold">Company Info:</h3>
              <ol>
                <li className="text-primary-foreground/60">MyAiPeople</li>
                <li className="text-primary-foreground/60">123 Street, Cityville, State, ZIP</li>
                <li className="text-primary-foreground/60">© 2024 Your Company.</li>
              </ol>
            </div>
            <div>
              <h3 className="text-white text-2xl font-semibold">Quick Links:</h3>
              <ul>
                <li className="text-primary-foreground/60">Terms of Service</li>
                <li className="text-primary-foreground/60">Privacy Policy</li>
                <li className="text-primary-foreground/60">FAQ</li>
                <li className="text-primary-foreground/60">Careers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold">Contacts:</h3>
              <ol>
                <li className="text-primary-foreground/60">Email: info@example.com</li>
                <li className="text-primary-foreground/60">Phone: +1 (555) 123-4567</li>
              </ol>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold">Social:</h3>
              <div className="flex gap-4 items-center py-2">
                <Link href={"/#"} className="hover:scale-105">
                  <Image src={"/facebook-icon.svg"} height={30} width={30} alt="facebook icon" />
                </Link>

                <Link href={"/#"} className="hover:scale-105">
                  <Image src={"/instagram-icon.svg"} height={30} width={30} alt="instagram icon" />
                </Link>

                <Link href={"/#"} className="hover:scale-105">
                  <Image src={"/twitter-icon.svg"} height={30} width={30} alt="twitter icon" />
                </Link>

                <Link href={"/#"} className="hover:scale-105">
                  <Image src={"/youtube-icon.svg"} height={30} width={30} alt="youtube icon" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative p-8 bg-foreground w-full md:w-1/2">
            <FormContact />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
