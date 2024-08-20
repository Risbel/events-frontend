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

const SettingsDate = ({ values, setValue }: { values: AddDiscoSchema; setValue: UseFormSetValue<AddDiscoSchema> }) => {
  return (
    <div className="absolute right-1 top-1">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SettingsIcon className="hover:rotate-45 transition-transform" height={18} width={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-xs py-1">Date Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>height</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={values.dateDescriptionHeight}
                  onValueChange={(value: any) => setValue("dateDescriptionHeight", value)}
                >
                  <DropdownMenuRadioItem value="text-md md:text-lg">
                    md-<span className="text-md md:text-lg">Lorem</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text-lg md:text-xl">
                    lg-<span className="text-lg md:text-xl">Lorem</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text-xl md:text-2xl">
                    xl-<span className="text-xl md:text-2xl">Lorem</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text-2xl md:text-3xl">
                    2xl-<span className="text-2xl md:text-3xl">Lorem</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text-3xl md:text-4xl">
                    3xl-<span className="text-3xl md:text-4xl">Lorem</span>
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
                  value={values.dateDescriptionWeight}
                  onValueChange={(value: any) => setValue("dateDescriptionWeight", value)}
                >
                  <DropdownMenuRadioItem value="font-normal">
                    <span className="font-normal">normal</span>
                  </DropdownMenuRadioItem>
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

export default SettingsDate;
