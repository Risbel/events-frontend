import { AddDiscoSchema } from "@/components/dashboard/workspace/AddDiscos";
import { generateColors } from "@/services/generateColors";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { UseFormReset, UseFormSetValue } from "react-hook-form";

export const useGenerateColors = (
  colorPalette: string[],
  setColorPalette: React.Dispatch<SetStateAction<string[]>>,
  reset: UseFormReset<AddDiscoSchema>
) => {
  return useMutation({
    mutationFn: generateColors,
    onSuccess: (data) => {
      let generatedColors = JSON.parse(data);

      setColorPalette(generatedColors);

      reset((prev) => ({
        ...prev,
        bgNavbarColor: generatedColors[0],
        navbarForeground: generatedColors[1],
        h1BannerColor: generatedColors[2],
        bannerDescriptionColor: generatedColors[3],
        bannerGradientColor: generatedColors[4],
        bgAboutColor: generatedColors[5],
        textAboutColor: generatedColors[6],
        buttonColor: generatedColors[7],
        buttonForeground: generatedColors[8],
        bgExperiencies: generatedColors[9],
        experienciesH1Color: generatedColors[10],
        bgTicketsSection: generatedColors[11],
        ticketH1Color: generatedColors[12],
        buttonsTicketsColor: generatedColors[13],
        buttonTicketForeground: generatedColors[14],
      }));
    },
  });
};
