import { Input, Label } from "@/components/ui/input";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";
import { Textarea } from "@/components/ui/textarea";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import { FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";

const Banner = ({
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
    <div className="flex flex-col gap-2 col-span-12 lg:col-span-8 p-4 md:p-6 bg-primary-foreground rounded-md shadow-md">
      <p className="text-xl text-center font-bold text-primary md:mb-4">Banner</p>
      <div className="flex flex-col md:flex-row gap-8 md:gap-4">
        <div className="flex flex-col gap-2 md:w-1/2">
          <div className="relative">
            <Label name={"Event title"} htmlfor={"h1Banner"} className="block mb-1 font-medium text-primary" />

            <Input
              autoComplete="off"
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="h1Banner"
              type="text"
              placeholder="Type the event title"
              {...register("h1Banner")}
            />
            {errors.h1Banner && <p className="text-xs italic text-red-500">{errors.h1Banner?.message}</p>}
          </div>
          <div className="relative">
            <LabelColor text="Title color" htmlFor="h1BannerColor" />
            <ColorPicker
              reset={reset}
              defaultValue="#afc1f3"
              id={"h1BannerColor"}
              register={register}
              defaultColor={values.h1BannerColor}
            />

            {errors.h1BannerColor && <p className="text-xs italic text-red-500">{errors.h1BannerColor?.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:w-1/2">
          <div className="relative">
            <Label htmlfor={"bannerImage"} name="Banner Image" className="block mb-1 font-medium text-primary" />

            <Input
              autoComplete="off"
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              type="file"
              accept=".png, .img, .jpg, .jpeg"
              id="bannerImage"
              placeholder="Type the URL banner image"
              {...register("bannerImage")}
            />
            {errors.bannerImage && <p className="text-xs italic text-red-500">{"Image required"}</p>}
          </div>
          <div className="relative">
            <LabelColor htmlFor="bannerGradientColor" text="Gradient color" />
            <ColorPicker
              reset={reset}
              defaultValue="#0e0046"
              register={register}
              id={"bannerGradientColor"}
              defaultColor={values.bannerGradientColor}
            />

            {errors.bannerGradientColor && (
              <p className="text-xs italic text-red-500">{errors.bannerGradientColor?.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 border-t pt-4 mt-4">
        <div className="relative w-full md:w-1/2 mt-6">
          <Label
            name={"Banner description"}
            htmlfor={"bannerDescription"}
            className="block mb-1 font-medium text-primary"
          />

          <Textarea
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="bannerDescription"
            placeholder="Banner description"
            rows={2}
            {...register("bannerDescription")}
          />
          {errors.bannerDescription && (
            <p className="text-xs italic text-red-500">{errors.bannerDescription?.message}</p>
          )}
        </div>
        <div className="relative w-full md:w-1/2">
          <LabelColor text="Text color" htmlFor="bannerDescriptionColor" />

          <ColorPicker
            reset={reset}
            defaultValue="#a8d4fb"
            id={"bannerDescriptionColor"}
            register={register}
            defaultColor={values.bannerDescriptionColor}
          />

          {errors.bannerDescriptionColor && (
            <p className="text-xs italic text-red-500">{errors.bannerDescriptionColor?.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
