import { Input, Label } from "@/components/ui/input";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import { Control, FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";
import SocialSelector from "./SocialSelector";
import QuickLinks from "./QuickLinks";

const Footer = ({
  register,
  errors,
  reset,
  values,
  control,
}: {
  register: UseFormRegister<AddDiscoSchema>;
  errors: FieldErrors<AddDiscoSchema>;
  reset: UseFormReset<AddDiscoSchema>;
  values: AddDiscoSchema;
  control: Control<AddDiscoSchema>;
}) => {
  return (
    <div className="w-full col-span-1 bg-primary-foreground p-4 md:p-6 rounded-md shadow-md">
      <p className="text-xl text-center font-bold text-primary mb-4">Footer</p>
      <div className="flex gap-2">
        <div className="relative mb-4 md:mr-2 w-1/2">
          <Label name={"phone number"} htmlfor={"phone"} className="block mb-1 font-medium text-primary" />

          <Input
            autoComplete="off"
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder="Type your phone here"
            {...register("phone")}
          />
          {errors.phone && <p className="text-xs italic text-red-500">{errors.phone?.message}</p>}
        </div>
        <div className="relative mb-4 md:mr-2  w-1/2">
          <Label name={"email"} htmlfor={"discoName"} className="block mb-1 font-medium text-primary" />

          <Input
            autoComplete="off"
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="type your email"
            {...register("email")}
          />
          {errors.email && <p className="text-xs italic text-red-500">{errors.email?.message}</p>}
        </div>
      </div>

      <div className="relative mb-4 pb-2">
        <Label name={"Address"} htmlfor={"address"} className="block mb-1 font-medium text-primary" />

        <Input
          autoComplete="off"
          className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Address"
          {...register("address")}
        />
        {errors.address && <p className="text-xs italic text-red-500">{errors.address?.message}</p>}
      </div>

      <div className="flex gap-2">
        <div className="w-1/2">
          <SocialSelector register={register} values={values} />
          {errors.socials && <p className="text-xs italic text-red-500">Error link</p>}
        </div>
        <div className="w-1/2">
          <QuickLinks register={register} values={values} control={control} />
          {errors.quickLinks && <p className="text-xs italic text-red-500">Error link</p>}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <div className="relative w-1/2">
          <LabelColor text="Background color" htmlFor="bgFooterColor" />

          <ColorPicker
            reset={reset}
            defaultValue="#07011e"
            id={"bgFooterColor"}
            register={register}
            defaultColor={values.bgFooterColor}
          />

          {errors.bgFooterColor && <p className="text-xs italic text-red-500">{errors.bgFooterColor?.message}</p>}
        </div>
        <div className="relative w-1/2">
          <LabelColor text="Text color" htmlFor="foregroundFooterColor" />

          <ColorPicker
            reset={reset}
            defaultValue="#ffffff"
            id={"foregroundFooterColor"}
            register={register}
            defaultColor={values.foregroundFooterColor}
          />

          {errors.foregroundFooterColor && (
            <p className="text-xs italic text-red-500">{errors.foregroundFooterColor?.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
