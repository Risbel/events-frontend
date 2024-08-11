import { Control, FieldErrors, UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form";
import { cn } from "@/lib/shadcnUtils";
import { Input, Label } from "@/components/ui/input";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";
import AddAboutTexts from "./AddAboutTexts";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";

const About = ({
  register,
  errors,
  reset,
  values,
  setValue,
  control,
}: {
  register: UseFormRegister<AddDiscoSchema>;
  errors: FieldErrors<AddDiscoSchema>;
  reset: UseFormReset<AddDiscoSchema>;
  values: AddDiscoSchema;
  setValue: UseFormSetValue<AddDiscoSchema>;
  control: Control<AddDiscoSchema>;
}) => {
  return (
    <div className="flex flex-col justify-around col-span-12 lg:col-span-8 bg-primary-foreground rounded-md p-4 md:p-6 shadow-md">
      <p className="text-xl text-center font-bold text-primary mb-4 md:mb-0">About</p>

      <div className="flex gap-4 pb-6 justify-center">
        <button
          type="button"
          onClick={() => setValue("layoutTextAbout", "variantA")}
          className={cn("w-10 p-1", values.layoutTextAbout === "variantA" && "border-2 border-blue-300 rounded")}
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-[3px]">
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
            </div>
            <div className="flex flex-col gap-[3px]">
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setValue("layoutTextAbout", "variantB")}
          className={cn("w-10 p-1", values.layoutTextAbout === "variantB" && "border-2 border-blue-300 rounded")}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[3px] pr-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
              <div className="flex flex-col gap-[3px] pl-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
            </div>
            <div className="flex flex-col gap-[3px]">
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setValue("layoutTextAbout", "variantC")}
          className={cn("w-10 p-1", values.layoutTextAbout === "variantC" && "border-2 border-blue-300 rounded")}
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-[3px]">
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-[3px] pr-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
              <div className="flex flex-col gap-[3px] pl-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setValue("layoutTextAbout", "variantD")}
          className={cn("w-10 p-1", values.layoutTextAbout === "variantD" && "border-2 border-blue-300 rounded")}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[3px] pr-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
              <div className="flex flex-col gap-[3px] pl-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-[3px] pr-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
              <div className="flex flex-col gap-[3px] pl-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setValue("layoutTextAbout", "variantE")}
          className={cn("w-10 p-1", values.layoutTextAbout === "variantE" && "border-2 border-blue-300 rounded")}
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-[3px]">
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-[3px] pr-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
              <div className="flex flex-col gap-[3px] px-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
              <div className="flex flex-col gap-[3px] pl-[2px] w-full">
                <div className="border border-black"></div>
                <div className="border border-black"></div>
                <div className="border border-black"></div>
              </div>
            </div>
          </div>
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="flex flex-col gap-4 w-full md:w-1/2  mb-4 md:mb-0">
          <div className="relative w-full">
            <Label name={"Title text"} htmlfor={"titleTextAbout"} className="block mb-1 font-medium text-primary" />

            <Input
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="titleTextAbout"
              placeholder="Title text"
              {...register("titleTextAbout")}
            />
            {errors.titleTextAbout && <p className="text-xs italic text-red-500">{errors.titleTextAbout?.message}</p>}
          </div>
          <div className="relative pb-2 w-full">
            <LabelColor htmlFor="titleAboutColor" text="Title about color" />
            <ColorPicker
              reset={reset}
              defaultValue="#0e0046"
              register={register}
              id={"titleAboutColor"}
              defaultColor={values.titleAboutColor}
            />
            {errors.titleAboutColor && <p className="text-xs italic text-red-500">{errors.titleAboutColor?.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-4 w-full md:w-1/2 ">
          <AddAboutTexts register={register} values={values} control={control} setValue={setValue} />
          <div className="relative pb-2">
            <LabelColor htmlFor="bgAboutColor" text="Background color" />
            <ColorPicker
              reset={reset}
              defaultValue="#0e0046"
              id={"bgAboutColor"}
              register={register}
              defaultColor={values.bgAboutColor}
            />
            {errors.bgAboutColor && <p className="text-xs italic text-red-500">{errors.bgAboutColor?.message}</p>}
          </div>

          {/* <div className="h-28 w-0 border-l" /> */}

          {/* <div className="relative pb-2">
			<LabelColor text="Button color" htmlFor="buttonColor" />
			<ColorPicker
			reset={reset}
				defaultValue="#a8d4fb"
				register={register}
				id={"buttonColor"}
				defaultColor={values.buttonColor}
			/>
			{errors.buttonColor && <p className="text-xs italic text-red-500">{errors.buttonColor?.message}</p>}
		</div>
		<div className="relative pb-2">
			<LabelColor htmlFor="buttonForeground" text="Button foreground" />
			<ColorPicker
			reset={reset}
				defaultValue="#0e0046"
				register={register}
				id={"buttonForeground"}
				defaultColor={values.buttonForeground}
			/>
			{errors.buttonForeground && (
				<p className="text-xs italic text-red-500">{errors.buttonForeground?.message}</p>
			)}
		</div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
