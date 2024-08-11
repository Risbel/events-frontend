import { Input, Label } from "@/components/ui/input";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";
import { FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";

const Navbar = ({
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
    <div className="flex flex-col justify-between gap-2 col-span-12 lg:col-span-4 bg-primary-foreground p-4 md:p-6 rounded-md shadow-md">
      <p className="pb-4 text-xl text-center font-bold text-primary">Navbar</p>
      <div className="relative">
        <Label htmlfor={"logo"} name={"Logo"} className="block mb-1 font-medium text-primary" />

        <Input
          autoComplete="off"
          className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
          id="logo"
          type="file"
          accept=".png, .img, .jpg, .jpeg"
          placeholder="logo"
          {...register("logo")}
        />
        {errors.logo && <p className="text-xs italic text-red-500">{"Image required"}</p>}
      </div>
      <div className="relative">
        <LabelColor htmlFor="bgNavbarColor" text="Background color" />
        <ColorPicker
          reset={reset}
          defaultValue="#010e32"
          defaultColor={values.bgNavbarColor}
          register={register}
          id={"bgNavbarColor"}
        />

        {errors.bgNavbarColor && <p className="text-xs italic text-red-500">{errors.bgNavbarColor?.message}</p>}
      </div>
      <div className="relative">
        <LabelColor text="Text color" htmlFor="navbarForeground" />
        <ColorPicker
          reset={reset}
          defaultValue="#a8d4fb"
          defaultColor={values.navbarForeground}
          register={register}
          id={"navbarForeground"}
        />

        {errors.navbarForeground && <p className="text-xs italic text-red-500">{errors.navbarForeground?.message}</p>}
      </div>
    </div>
  );
};

export default Navbar;
