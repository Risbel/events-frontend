import { Input, Label } from "@/components/ui/input";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";
import { FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";

const GeneralInfo = ({
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
    <div className="flex flex-col col-span-12 lg:col-span-4 bg-primary-foreground p-4 md:p-6 rounded-md shadow-md">
      <p className="pb-4 text-xl text-center font-bold text-primary">General info</p>
      <div className="relative mb-4">
        <Label name={"Brand"} htmlfor={"discoName"} className="block mb-1 font-medium text-primary" />

        <Input
          autoComplete="off"
          className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
          id="discoName"
          type="text"
          placeholder="Type your brand name"
          {...register("name")}
        />
        {errors.name && <p className="text-xs italic text-red-500">{errors.name?.message}</p>}
      </div>
      <div className="relative mb-4">
        <Label name={"Link name"} htmlfor={"slug"} className="block mb-1 font-medium text-primary" />

        <Input
          autoComplete="off"
          className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
          id="slug"
          type="text"
          placeholder="Type in lower case your link name"
          {...register("slug")}
        />
        {errors.slug && <p className="text-xs italic text-red-500">{errors.slug?.message}</p>}
      </div>
      <div className="flex gap-2 w-full">
        <div className="relative mb-4 w-1/2">
          <Label name={"Start date"} htmlfor={"startDate"} className="block mb-1 font-medium text-primary" />

          <Input
            {...register("startDate")}
            autoComplete="off"
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="startDate"
            type="date"
          />
          {errors.startDate && <p className="text-xs italic text-red-500">{errors.startDate?.message}</p>}
        </div>
        <div className="relative mb-4 w-1/2">
          <Label name={"End date"} htmlfor={"endDate"} className="block mb-1 font-medium text-primary" />

          <Input
            {...register("endDate")}
            autoComplete="off"
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="endDate"
            type="date"
          />
          {errors.endDate && <p className="text-xs italic text-red-500">{errors.endDate?.message}</p>}
        </div>
      </div>
      <div className="relative pb-2 ">
        <LabelColor htmlFor="brandColor" text="Color brand" />

        <ColorPicker
          reset={reset}
          register={register}
          id={"brandColor"}
          defaultValue="#0e0046"
          defaultColor={values.brandColor}
        />
        {errors.brandColor && <p className="text-xs italic text-red-500">{errors.brandColor?.message}</p>}
      </div>
    </div>
  );
};

export default GeneralInfo;
