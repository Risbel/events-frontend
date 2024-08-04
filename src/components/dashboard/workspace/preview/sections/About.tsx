import { cn } from "@/lib/shadcnUtils";
import { useEffect, useState } from "react";
import { AddDiscoSchema } from "../../AddDiscos";

const About = ({ values }: { values: AddDiscoSchema }) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);

  const updateMedia = () => {
    setIsWideScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const variantA = ["flex-2", "flex-2", "flex-2", "flex-2"];
  const variantB = ["w-1/2", "w-1/2", "w-full", "full"];
  const variantC = ["w-full", "w-1/2", "w-1/2", "full"];
  const variantD = ["w-1/2", "w-1/2", "w-1/2", "w-1/2"];
  const variantE = ["flex-2", "flex-1", "flex-1", "flex-1"];

  return (
    <div id="2" style={{ background: values.bgAboutColor }} className="relative">
      <div style={{ background: "white" }} className="absolute z-30 h-20 w-20 rounded-full blur-3xl top-28" />

      <div className="absoulute z-20 ">
        <div className="flex flex-col items-center px-4 lg:px-16 py-8 md:py-32">
          <h1
            style={{ color: `${values.titleAboutColor}` }}
            className="font-extrabold text-4xl md:text-4xl lg:text-6xl pb-5 text-wrap px-8 text-center"
          >
            {values.titleTextAbout ? values.titleTextAbout : "About us"}
          </h1>
          <div className="relative overflow-hidden max-h-[400px] overflow-y-auto flex flex-wrap w-full">
            {values?.aboutTexts &&
              values.aboutTexts.map((text, index) => {
                return (
                  <div
                    className={cn(
                      isWideScreen && values.layoutTextAbout == "variantA" && variantA[index],
                      isWideScreen && values.layoutTextAbout == "variantB" && variantB[index],
                      isWideScreen && values.layoutTextAbout == "variantC" && variantC[index],
                      isWideScreen && values.layoutTextAbout == "variantD" && variantD[index],
                      isWideScreen && values.layoutTextAbout == "variantE" && variantE[index],
                      "p-4"
                    )}
                    key={index}
                  >
                    <h2
                      className="text-3xl"
                      style={{
                        textAlign: text?.titleAlign,
                        color: text?.titleColor,
                        fontWeight: "bold",
                      }}
                    >
                      {text.title}
                    </h2>
                    <p
                      className="text-xl md:text-2xl "
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
      </div>
    </div>
  );
};

export default About;
