import { Button } from "@/components/ui/button";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

const ColorPaletteGenerator = ({ setValues }: { setValues: UseFormSetValue<AddDiscoSchema> }) => {
  const [colorPalette, setColorPalette] = useState(["#808080", "#666666", "#4d4d4d", "#333333", "#1a1a1a"]);

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    // Make sure it is always 6 digits
    return `#${"0".repeat(6 - randomColor.length)}${randomColor}`;
  };

  const generatePalette = () => {
    const newPalette: any = [];
    for (let i = 0; i < 5; i++) {
      newPalette.push(generateRandomColor());
    }
    setColorPalette(newPalette);
    setValues("bgNavbarColor", newPalette[0]);
    setValues("bannerGradientColor", newPalette[0]);
  };

  return (
    <div className="flex flex-col col-span-4 justify-between px-6 pt-6 pb-10 bg-white rounded-md shadow-md">
      <h2 className="text-xl text-primary text-center font-bold mb-4">Color Palette Generator</h2>

      <div className="flex flex-col gap-3 items-center justify-between mb-6">
        {colorPalette.map((color, i) => {
          return (
            <div key={i} className="flex gap-2 items-center w-full">
              <div style={{ background: color }} className="w-2/3 h-6 rounded-full"></div>
              <div className="text-center w-1/3 rounded-full border cursor-pointer group hover:bg-primary">
                <span className="text-sm text-gray-700 group-hover:text-primary-foreground">{color}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-center items-center">
        <Button type="button" onClick={generatePalette}>
          Generate palette
        </Button>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
