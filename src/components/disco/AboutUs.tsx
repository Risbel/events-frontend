import { DiscoDetail } from "@/services/getDisco";
import React from "react";
import { Button } from "../ui/button";

const AboutUs = ({ discoDetails }: { discoDetails: DiscoDetail }) => {
  return (
    <div className="relative">
      <div className="absolute -z-10 h-20 w-20 bg-white rounded-full blur-3xl top-28" />

      <div className="absoulute z-20 h-full">
        <div className="flex flex-col items-center px-8 py-24 md:py-32">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-7xl text-white pb-5">About us</h1>
          <p className="text-white text-md md:text-lg font-light text-center">{discoDetails.largeDescription}</p>
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

      <div className="absolute -z-10 h-20 w-20 bg-white rounded-full blur-3xl right-0 -translate-y-20" />
    </div>
  );
};

export default AboutUs;
