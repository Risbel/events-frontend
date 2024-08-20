import { SettingsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddDiscoSchema } from "../../schemas/addDiscoSchema";
import { UseFormSetValue } from "react-hook-form";

const SettingsH1 = ({ values, setValue }: { values: AddDiscoSchema; setValue: UseFormSetValue<AddDiscoSchema> }) => {
  return (
    <div className="absolute right-1 top-1">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SettingsIcon className="hover:rotate-45 transition-transform" height={18} width={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-xs py-1">Title Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>height</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={values.h1BannerHeight}
                  onValueChange={(value: any) => setValue("h1BannerHeight", value)}
                >
                  <DropdownMenuRadioItem value="text-2xl md:text-4xl">
                    4xl-<span className="text-2xl md:text-4xl">Lorem</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text-3xl md:text-5xl">
                    5xl-<span className="text-3xl md:text-5xl">Lorem</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text-4xl md:text-6xl">
                    6xl-<span className="text-4xl md:text-6xl">Lorem</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text-5xl md:text-7xl">
                    7xl-<span className="text-5xl md:text-7xl">Lorem</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text-6xl md:text-8xl">
                    8xl-<span className="text-6xl md:text-8xl">Lorem</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>weight</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={values.h1Weight}
                  onValueChange={(value: any) => setValue("h1Weight", value)}
                >
                  <DropdownMenuRadioItem value="font-semibold">
                    <span className="font-semibold">semibold</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="font-bold">
                    <span className="font-bold">bold</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="font-extrabold">
                    <span className="font-extrabold">extrabold</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SettingsH1;
