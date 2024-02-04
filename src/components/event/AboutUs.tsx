import { Button } from "@/components/ui/button";
import { DiscoDetail } from "@/services/getDisco";
import React from "react";

const AboutUs = ({ discoDetails }: { discoDetails: DiscoDetail }) => {
  return (
    <div style={{ background: discoDetails.discoColor.bgAboutColor }} className="relative">
      <div style={{ background: "white" }} className="absolute z-30 h-20 w-20 rounded-full blur-3xl top-28" />

      <div className="absoulute z-20 ">
        <div className="flex flex-col items-center px-4 lg:px-16 py-24 md:py-32">
          <h1
            style={{ color: `${discoDetails.discoColor.textAboutColor}` }}
            className="font-extrabold text-4xl md:text-5xl lg:text-7xl pb-5"
          >
            About us
          </h1>

          <p
            style={{ color: `${discoDetails.discoColor.textAboutColor}` }}
            className="line-clamp-[12] md:line-clamp-6 text-md md:text-lg font-light text-center"
          >
            {discoDetails.aboutDescription}
          </p>

          <Button
            className="mt-8 hover:opacity-90 px-8"
            style={{ backgroundColor: `${discoDetails.discoColor.buttonColor}` }}
          >
            <span style={{ color: `${discoDetails.discoColor.buttonForeground}` }}>More</span>
          </Button>
        </div>

        {/* <div className="flex justify-between">
          <div
            style={{ borderColor: `#${discoDetails.discoColor.brandColor}` }}
            className="border-4 w-1/4 rounded-r-full"
          />
          <div
            style={{ borderColor: `#${discoDetails.discoColor.brandColor}` }}
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

export default AboutUs;
