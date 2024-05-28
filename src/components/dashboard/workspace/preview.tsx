import AboutPreview from "./AboutPreview";
import BannerPreview from "./BannerPreview";
import ExperiencesPreview from "./ExperiencesPreview";
import NavbarPreview from "./NavbarPreview";
import TicketsPreview from "./TicketsPreview";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";
import FooterPreview from "./FooterPreview";

const Preview = ({ values }: { values: AddDiscoSchema }) => {
  return (
    <div className="relative">
      <NavbarPreview values={values} />
      <BannerPreview values={values} />
      <AboutPreview values={values} />
      <ExperiencesPreview values={values} />
      <TicketsPreview values={values} />
      <FooterPreview values={values} />
    </div>
  );
};

export default Preview;
