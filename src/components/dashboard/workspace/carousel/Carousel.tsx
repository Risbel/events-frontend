import { FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import { Input, Label } from "@/components/ui/input";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";

const Carousel = ({
  register,
  errors,
  reset,
  values,
}: {
  register: UseFormRegister<AddDiscoSchema>;
  errors: FieldErrors<AddDiscoSchema>;
  reset: UseFormReset<AddDiscoSchema>;
  values: AddDiscoSchema;
}) => {
  return (
    <div className="col-span-12 lg:col-span-4 bg-primary-foreground rounded-md p-4 md:p-6 shadow-md">
      <div className="flex flex-col gap-2 pb-4">
        <p className="text-xl text-center font-bold text-primary mb-4">Carousel</p>
        <div className="relative">
          <Label name={"Title text"} htmlfor={"titleTextCarousel"} className="block mb-1 font-medium text-primary" />

          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="titleTextCarousel"
            placeholder="Title text"
            {...register("titleTextCarousel")}
          />
          {errors.titleTextCarousel && (
            <p className="text-xs italic text-red-500">{errors.titleTextCarousel?.message}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full">
          <div className="relative pb-2 md:w-1/2 lg:w-full">
            <LabelColor htmlFor="experienciesH1Color" text="Title color" />
            <ColorPicker
              reset={reset}
              defaultValue="#a7d8f5"
              register={register}
              id={"experienciesH1Color"}
              defaultColor={values.experienciesH1Color}
            />
            {errors.experienciesH1Color && (
              <p className="text-xs italic text-red-500">{errors.experienciesH1Color?.message}</p>
            )}
          </div>
          <div className="relative pb-2 md:w-1/2 lg:w-full">
            <LabelColor htmlFor="bgExperiencies" text="Background color" />
            <ColorPicker
              reset={reset}
              defaultValue="#a7d8f5"
              register={register}
              id={"bgExperiencies"}
              defaultColor={values.bgExperiencies}
            />

            {errors.bgExperiencies && <p className="text-xs italic text-red-500">{errors.bgExperiencies?.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
