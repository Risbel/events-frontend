import { cn } from "@/lib/shadcnUtils";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import { UseFormSetValue } from "react-hook-form";

const JustifyPanel = ({ values, setValue }: { values: AddDiscoSchema; setValue: UseFormSetValue<AddDiscoSchema> }) => {
  return (
    <div className="flex gap-3 pb-6 justify-center">
      <button
        type="button"
        onClick={() => setValue("layoutTextBanner", "variantA")}
        className={cn("w-10 p-1", values.layoutTextBanner === "variantA" && "border-2 border-blue-300 rounded")}
      >
        <div className="grid grid-cols-3 gap-[1px]">
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black bg-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => setValue("layoutTextBanner", "variantB")}
        className={cn("w-10 p-1", values.layoutTextBanner === "variantB" && "border-2 border-blue-300 rounded")}
      >
        <div className="grid grid-cols-3 gap-[1px]">
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2 bg-black"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
        </div>
      </button>
      <button
        type="button"
        onClick={() => setValue("layoutTextBanner", "variantC")}
        className={cn("w-10 p-1", values.layoutTextBanner === "variantC" && "border-2 border-blue-300 rounded")}
      >
        <div className="grid grid-cols-3 gap-[1px]">
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2 bg-black"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => setValue("layoutTextBanner", "variantD")}
        className={cn("w-10 p-1", values.layoutTextBanner === "variantD" && "border-2 border-blue-300 rounded")}
      >
        <div className="grid grid-cols-3 gap-[1px]">
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2 bg-black"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => setValue("layoutTextBanner", "variantE")}
        className={cn("w-10 p-1", values.layoutTextBanner === "variantE" && "border-2 border-blue-300 rounded")}
      >
        <div className="grid grid-cols-3 gap-[1px]">
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2 bg-black"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
        </div>
      </button>
      <button
        type="button"
        onClick={() => setValue("layoutTextBanner", "variantF")}
        className={cn("w-10 p-1", values.layoutTextBanner === "variantF" && "border-2 border-blue-300 rounded")}
      >
        <div className="grid grid-cols-3 gap-[1px]">
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2 bg-black"></div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
            <div className="border border-black h-2"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default JustifyPanel;
