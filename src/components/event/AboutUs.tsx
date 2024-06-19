import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shadcnUtils";
import { DiscoDetail } from "@/services/getDisco";
import { ArrowBigUpDash } from "lucide-react";
import React, { useEffect, useState } from "react";

const AboutUs = ({ discoDetails }: { discoDetails: DiscoDetail }) => {
  const variantA = ["flex-2", "flex-2", "flex-2", "flex-2"];
  const variantB = ["w-1/2", "w-1/2", "w-full", "full"];
  const variantC = ["w-full", "w-1/2", "w-1/2", "full"];
  const variantD = ["w-1/2", "w-1/2", "w-1/2", "w-1/2"];
  const variantE = ["flex-2", "flex-1", "flex-1", "flex-1"];

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);

  const updateMedia = () => {
    setIsWideScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div style={{ background: discoDetails.discoColor.bgAboutColor }} className="relative">
      <div className="flex flex-col items-center px-4 lg:px-16 py-12 md:py-32">
        <h1
          style={{ color: `${discoDetails.discoColor.titleAboutColor}` }}
          className="font-extrabold text-4xl lg:text-7xl pb-5 text-center"
        >
          {discoDetails.titleTextAbout ? discoDetails.titleTextAbout : "About us"}
        </h1>

        <div className="relative overflow-hidden overflow-y-auto max-h-[400px] flex flex-wrap w-full">
          {discoDetails.eventAbouts.map((text, index) => {
            return (
              <div
                className={cn(
                  isWideScreen && discoDetails.layoutTextAbout == "variantA" && variantA[index],
                  isWideScreen && discoDetails.layoutTextAbout == "variantB" && variantB[index],
                  isWideScreen && discoDetails.layoutTextAbout == "variantC" && variantC[index],
                  isWideScreen && discoDetails.layoutTextAbout == "variantD" && variantD[index],
                  isWideScreen && discoDetails.layoutTextAbout == "variantE" && variantE[index],
                  "p-4"
                )}
                key={index}
              >
                {text?.title && (
                  <h2
                    className="text-2xl md:text-3xl"
                    style={{
                      textAlign: text?.titleAlign,
                      color: text?.titleColor,
                      fontWeight: "bold",
                    }}
                  >
                    {text.title}
                  </h2>
                )}
                <p
                  className="text-lg md:text-2xl "
                  style={{
                    fontWeight: text.textWeight,
                    textAlign: text.textAlign,
                    color: text.textColor,
                  }}
                >
                  {text.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{ background: "white" }}
        className="absolute h-20 w-20 rounded-full blur-3xl right-0 -translate-y-20"
      />
    </div>
  );
};

export default AboutUs;
