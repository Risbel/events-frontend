import { AddDiscoSchema } from "../AddDiscos";
import About from "./sections/About";
import Banner from "./sections/Banner";
import Experiences from "./sections/Experiences";
import Footer from "./sections/Footer";
import Navbar from "./sections/Navbar";
import Tickets from "./sections/Tickets";

const Preview = ({ values }: { values: AddDiscoSchema }) => {
  return (
    <div className="h-full w-screen relative overflow-y-scroll scroll-smooth">
      <Navbar values={values} />
      <Banner values={values} />
      <About values={values} />
      <Experiences values={values} />
      <Tickets values={values} />
      <Footer values={values} />
    </div>
  );
};

export default Preview;
