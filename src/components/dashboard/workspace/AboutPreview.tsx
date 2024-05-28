import { Button } from "@/components/ui/button";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";

const AboutPreview = ({ values }: { values: AddDiscoSchema }) => {
  return (
    <div id="2" style={{ background: values.bgAboutColor }} className="relative">
      <div style={{ background: "white" }} className="absolute z-30 h-20 w-20 rounded-full blur-3xl top-28" />

      <div className="absoulute z-20 ">
        <div className="flex flex-col items-center px-4 lg:px-16 py-24 md:py-32">
          <h1
            style={{ color: `${values.textAboutColor}` }}
            className="font-extrabold text-3xl md:text-4xl lg:text-6xl pb-5"
          >
            {values.titleTextAbout ? values.titleTextAbout : "About us"}
          </h1>

          <p
            style={{ color: `${values.textAboutColor}` }}
            className="line-clamp-[12] md:line-clamp-6 text-md md:text-lg font-light text-center"
          >
            {values.aboutDescription}
          </p>

          <Button className="mt-8 hover:opacity-90 px-8" style={{ backgroundColor: `${values.buttonColor}` }}>
            <span style={{ color: `${values.buttonForeground}` }}>More</span>
          </Button>
        </div>

        {/* <div className="flex justify-between">
			<div
				style={{ borderColor: `#${values.brandColor}` }}
				className="border-4 w-1/4 rounded-r-full"
			/>
			<div
				style={{ borderColor: `#${values.brandColor}` }}
				className="border-4 w-3/5 rounded-l-full"
			/>
		</div> */}
      </div>

      <div
        style={{ background: "white" }}
        className="absolute h-20 w-20 rounded-full blur-3xl right-0 -translate-y-20"
      />
    </div>
  );
};

export default AboutPreview;
