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
        <div className="z-10 absolute h-80 w-80 bg-primary-foreground blur-3xl right-32"></div>
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

      <div className="relative">
        <div className="z-10 absolute h-full w-screen bg-secondary blur-3xl"></div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className="relative z-20 flex flex-col items-center bg-white shadow-xl m-4 md:m-8 lg:m-16 p-4 rounded-2xl h-full">
          <h1 className="text-secondary-foreground text-center text-3xl md:text-4xl lg:text-6xl font-extrabold w-4/5 py-4">
            <span className="inline-flex animate-background-shine bg-[linear-gradient(150deg,#47474795,45%,#02003f,105%,#47474795)] bg-[length:50%] bg-clip-text text-transparent">
              Our services
            </span>
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:p-8">
            <div className="relative overflow-hidden bg-secondary p-4 rounded-xl">
              <div className="z-10 absolute bottom-0 h-16 w-16 bg-sky-500 blur-3xl"></div>
              <div className="z-10 absolute h-20 w-20 bg-violet-400 blur-3xl right-0"></div>
              <h2 className="relative z-40 text-2xl text-secondary-foreground font-semibold">
                1. Virtual Event Spaces:
              </h2>
              <ul className="relative z-40 flex flex-col gap-2">
                <li className="rounded-md pl-2 text-primary">
                  Transform your events into memorable experiences with our customizable virtual event spaces.
                </li>
                <li className="rounded-md pl-2 text-primary">
                  Create engaging environments tailored to your specific needs.
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden bg-secondary p-4 rounded-xl">
              <div className="z-10 absolute bottom-0 h-16 w-16 bg-sky-500 blur-3xl"></div>
              <div className="z-10 absolute h-20 w-20 bg-violet-400 blur-3xl right-0"></div>
              <h2 className="relative z-40 text-2xl text-secondary-foreground font-semibold">
                2. E-commerce Integration:
              </h2>
              <ul className="relative z-40 flex flex-col gap-2">
                <li className="rounded-md pl-2 text-primary">
                  Seamlessly incorporate e-commerce functionality into your virtual spaces.
                </li>
                <li className="rounded-md pl-2 text-primary">
                  From payment processing to order tracking, streamline your online transactions effortlessly.
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden bg-secondary p-4 rounded-xl">
              <div className="z-10 absolute bottom-0 h-16 w-16 bg-sky-500 blur-3xl"></div>
              <div className="z-10 absolute h-20 w-20 bg-violet-400 blur-3xl right-0"></div>
              <h2 className="relative z-40 text-2xl text-secondary-foreground font-semibold">
                3. User-Friendly Customization:
              </h2>
              <ul className="relative z-40 flex flex-col gap-2">
                <li className="rounded-md pl-2 text-primary">
                  Easily personalize your virtual spaces with our intuitive and user-friendly interface.
                </li>
                <li className="rounded-md pl-2 text-primary">
                  No technical expertise required – design and manage with simplicity.
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden bg-secondary p-4 rounded-xl">
              <div className="z-10 absolute bottom-0 h-16 w-16 bg-sky-500 blur-3xl"></div>
              <div className="z-10 absolute h-20 w-20 bg-violet-400 blur-3xl right-0"></div>
              <h2 className="relative z-40 text-2xl text-secondary-foreground font-semibold">
                4. Swift Updates and Maintenance:
              </h2>
              <ul className="relative z-40 flex flex-col gap-2">
                <li className="rounded-md pl-2 text-primary">
                  Keep your virtual spaces up-to-date with quick and hassle-free content updates.
                </li>
                <li className="rounded-md pl-2 text-primary">
                  Adapt to changing event requirements without a lengthy development process.
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden bg-secondary p-4 rounded-xl">
              <div className="z-10 absolute bottom-0 h-16 w-16 bg-sky-500 blur-3xl"></div>
              <div className="z-10 absolute h-20 w-20 bg-violet-400 blur-3xl right-0"></div>
              <h2 className="relative z-40 text-2xl text-secondary-foreground font-semibold">
                5. Data Analysis and Tracking:
              </h2>
              <ul className="relative z-40 flex flex-col gap-2">
                <li className="rounded-md pl-2 text-primary">
                  Gain valuable insights into your virtual space&lsquo;s performance with our integrated analytics
                  tools.
                </li>
                <li className="rounded-md pl-2 text-primary">
                  Track user engagement and make informed decisions for future events.
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden bg-secondary p-4 rounded-xl">
              <div className="z-10 absolute bottom-0 h-16 w-16 bg-sky-500 blur-3xl"></div>
              <div className="z-10 absolute h-20 w-20 bg-violet-400 blur-3xl right-0"></div>
              <h2 className="relative z-40 text-2xl text-secondary-foreground font-semibold">
                6. Multi-Device Compatibility:
              </h2>
              <ul className="relative z-40 flex flex-col gap-2">
                <li className="rounded-md pl-2 text-primary">
                  Ensure a seamless experience for participants across various devices and browsers.
                </li>
                <li className="rounded-md pl-2 text-primary">
                  Our platform is optimized for accessibility and compatibility.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-primary">
        <div className="absolute inset-0 z-10 h-full w-full bg-primary bg-[linear-gradient(to_right,#bdbdbd1e_1px,transparent_1px),linear-gradient(to_bottom,#bdbdbd3c_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className="relative z-20 p-4 md:p-8 lg:p-16 pt-8 h-full w-full">
          <h1 className="text-primary-foreground text-center text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="inline-flex animate-background-shine bg-[linear-gradient(150deg,#ffffff,45%,#d1d0ff,100%,#ffffff)] bg-[length:50%] bg-clip-text text-transparent pb-4">
              Advantages
            </span>
          </h1>
          <div className="">
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
