import { Button } from "@/components/ui/button";
import { useGenerateColors } from "@/hooks/useGenerateColors";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";
import { Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";

const ColorPaletteGenerator = ({
  reset,
  brandColor,
  values,
}: {
  reset: UseFormReset<AddDiscoSchema>;
  brandColor: string;
  values: AddDiscoSchema;
}) => {
  const [colorPalette, setColorPalette] = useState([
    "#0e0046",
    "#7b9eff",
    "#a8d4fb",
    "#afc1f3",
    "#0e0046",
    "#a8d4fb",
    "#0e0046",
    "#0e0046",
    "#a8d4fb",
    "#0e0046",
    "#a7d8f5",
    "#a7d8f5",
    "#ffffff",
    "#0b023d",
    "#0e0046",
    "#ffffff",
    "#07011e",
    "#ffffff",
  ]);
  const { mutate, data, isLoading } = useGenerateColors(colorPalette, setColorPalette, reset);

  useEffect(() => {
    setColorPalette([
      values.brandColor ?? "#0e0046",
      values.bgNavbarColor ?? "#7b9eff",
      values.navbarForeground ?? "#a8d4fb",
      values.h1BannerColor ?? "#afc1f3",
      values.bannerDescriptionColor ?? "#0e0046",
      values.bannerGradientColor ?? "#a8d4fb",
      values.bgAboutColor ?? "#0e0046",
      values.textAboutColor ?? "#0e0046",
      values.buttonColor ?? "#a8d4fb",
      values.buttonForeground ?? "#0e0046",
      values.bgExperiencies ?? "#a7d8f5",
      values.experienciesH1Color ?? "#a7d8f5",
      values.bgTicketsSection ?? "#ffffff",
      values.ticketH1Color ?? "#0b023d",
      values.buttonsTicketsColor ?? "#0e0046",
      values.buttonTicketForeground ?? "#ffffff",
      values.bgFooterColor ?? "#07011e",
      values.foregroundFooterColor ?? "#ffffff",
    ]);
  }, [values]);

  const generatePalette = () => {
    mutate(brandColor);
  };

  return (
    <div className="flex flex-col col-span-4 justify-between px-6 pt-6 pb-10 bg-white rounded-md shadow-md">
      <h2 className="text-xl text-primary text-center font-bold mb-4">Color Palette Generator</h2>

      <div className="grid grid-cols-2 gap-3 items-center justify-between mb-6">
        {colorPalette &&
          colorPalette.map((color, i) => {
            return (
              <div key={i} className="flex gap-2 items-center w-full">
                <div style={{ background: color }} className="w-1/2 h-6 rounded-full border"></div>
                <div className="text-center w-1/2 rounded-full border cursor-pointer group hover:bg-primary">
                  <span className="text-sm text-gray-700 group-hover:text-primary-foreground">{color}</span>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex w-full justify-center items-center">
        <Button type="button" onClick={generatePalette}>
          {isLoading ? <Loader2 stroke="white" className="animate-spin" /> : "Generate palette"}
        </Button>
      </div>
    </div>
  );
};

const MemoizedColorPaletteGenerator = memo(ColorPaletteGenerator);
MemoizedColorPaletteGenerator.displayName = "ColorPaletteGenerator";

export default MemoizedColorPaletteGenerator;
