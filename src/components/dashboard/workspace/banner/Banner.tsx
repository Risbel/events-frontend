import { Input, Label } from "@/components/ui/input";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";
import { Textarea } from "@/components/ui/textarea";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import { FieldErrors, UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form";
import JustifyPanel from "./JustifyPanel";
import SettingsH1 from "./settingsH1";
import SettingsDescription from "./settingsDescription";
import SettingsDate from "./settingsDate";

const Banner = ({
  register,
  errors,
  reset,
  values,
  setValue,
}: {
  register: UseFormRegister<AddDiscoSchema>;
  errors: FieldErrors<AddDiscoSchema>;
  reset: UseFormReset<AddDiscoSchema>;
  values: AddDiscoSchema;
  setValue: UseFormSetValue<AddDiscoSchema>;
}) => {
  return (
    <div className="flex flex-col gap-2 col-span-12 lg:col-span-8 p-4 md:p-6 bg-primary-foreground rounded-md shadow-md">
      <p className="text-xl text-center font-bold text-primary md:mb-4">Banner</p>
      <JustifyPanel setValue={setValue} values={values} />
      <div className="flex flex-col md:flex-row gap-8 md:gap-4">
        <div className="flex flex-col gap-2 md:w-1/2">
          <div className="relative">
            <div className="relative">
              <Label name={"Event title"} htmlfor={"h1Banner"} className="block mb-1 font-medium text-primary" />

              <Input
                autoComplete="off"
                className="w-full py-2 pl-2 pr-6 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
                id="h1Banner"
                type="text"
                placeholder="Type the event title"
                {...register("h1Banner")}
              />
              {errors.h1Banner && <p className="text-xs italic text-red-500">{errors.h1Banner?.message}</p>}
            </div>
            <SettingsH1 values={values} setValue={setValue} />
          </div>
          <div className="relative">
            <LabelColor text="Title color" htmlFor="h1BannerColor" />
            <ColorPicker
              reset={reset}
              defaultValue="#ffffff"
              id={"h1BannerColor"}
              register={register}
              defaultColor={values.h1BannerColor}
            />

            {errors.h1BannerColor && <p className="text-xs italic text-red-500">{errors.h1BannerColor?.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:w-1/2">
          <div className="relative">
            <div className="relative">
              <Label
                name={"Date description"}
                htmlfor={"dateDescription"}
                className="block mb-1 font-medium text-primary"
              />

              <Input
                autoComplete="off"
                className="w-full py-2 pl-2 pr-6 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
                id="dateDescription"
                type="text"
                placeholder="Type the event title"
                {...register("dateDescription")}
              />
              {errors.h1Banner && <p className="text-xs italic text-red-500">{errors.dateDescription?.message}</p>}
            </div>
            <SettingsDate values={values} setValue={setValue} />
          </div>
          <div className="relative">
            <LabelColor text="Date color" htmlFor="dateDescriptionColor" />
            <ColorPicker
              reset={reset}
              defaultValue="#ffffff"
              id={"dateDescriptionColor"}
              register={register}
              defaultColor={values.dateDescriptionColor}
            />

            {errors.dateDescriptionColor && (
              <p className="text-xs italic text-red-500">{errors.dateDescriptionColor?.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="relative flex flex-col md:flex-row items-center gap-4 border-t pt-4 mt-4">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <div className="relative">
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

            <SettingsDescription values={values} setValue={setValue} />
          </div>
          <div className="relative">
            <LabelColor text="Text color" htmlFor="bannerDescriptionColor" />

            <ColorPicker
              reset={reset}
              defaultValue="#d4e4f3"
              id={"bannerDescriptionColor"}
              register={register}
              defaultColor={values.bannerDescriptionColor}
            />

            {errors.bannerDescriptionColor && (
              <p className="text-xs italic text-red-500">{errors.bannerDescriptionColor?.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2 justify-between h-full">
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
    </div>
  );
};

export default Banner;
