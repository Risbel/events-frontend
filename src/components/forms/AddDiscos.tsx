import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCreateDisco from "@/hooks/useCreateDisco";
import { addDiscoSchema } from "./zodSchemas/addDiscoSchema";
import ButtonSubmit from "../buttons/ButtonSubmit";
import useGetMe from "@/hooks/useGetMe";
import Spinner from "../loaders/Spinner";
import Resource405 from "../alerts/Resource405";
import Link from "next/link";
import { useState } from "react";
import { Input, Label } from "../ui/input";
import { Textarea } from "../ui/textarea";

export type AddDiscoSchema = z.infer<typeof addDiscoSchema>;

const AddDiscos = () => {
  const [bankCardInput, setBankCardInput] = useState("");
  const [errorBankCard, setErrorBankCard] = useState("");
  const { isLoading: isLoadingMy, user } = useGetMe();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddDiscoSchema>({
    resolver: zodResolver(addDiscoSchema),
  });

  const { submitDataDisco, isLoading } = useCreateDisco();
  const onSubmit: SubmitHandler<AddDiscoSchema> = (data) => {
    if (bankCardInput.length < 19) {
      setErrorBankCard("This field most be at least 16 characters");
      return;
    }
    setErrorBankCard("");
    data.bankCardNumber = bankCardInput;

    submitDataDisco(data);
    reset();
    setBankCardInput("");
  };

  if (isLoadingMy) {
    return (
      <div className="flex pt-24 justify-center">
        <Spinner diameter={8} stroke="black" />
      </div>
    );
  }

  if (user) {
    if (user.email !== "risbel961019@gmail.com") {
      return (
        <div className="flex flex-col justify-center items-center gap-8 pt-24">
          <Resource405 text={"This resource is just reserved for admins"} />
          <Link className="text-md text-white p-2 bg-purple-600/40 hover:bg-purple-500/40 rounded-lg" href={"/"}>
            Back to home
          </Link>
        </div>
      );
    }
  }

  return (
    <>
      <h1 className="text-xl md:text-2xl text-primary font-bold pb-8">Let&apos;s create an Event: </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid md:grid-cols-2 mb-2">
          <div className="relative mb-4 md:mr-2">
            <Label name={"Event name"} htmlfor={"discoName"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="discoName"
              type="text"
              placeholder="e.g. Under the moon"
              {...register("name")}
            />
            {errors.name && <p className="text-xs italic text-red-500">{errors.name?.message}</p>}
          </div>
          <div className="relative mb-4">
            <Label name={"Slug URL"} htmlfor={"slug"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="slug"
              type="text"
              placeholder="e.g. lunar-event.com"
              {...register("slug")}
            />
            {errors.slug && <p className="text-xs italic text-red-500">{errors.slug?.message}</p>}
          </div>
        </div>
        <div className="relative mb-4 pb-2">
          <Label htmlfor={"logo"} name={"Logo URL"} className="block mb-1 text-sm font-medium text-primary" />

          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="logo"
            type="text"
            placeholder="logo URL"
            {...register("logo")}
          />
          {errors.logo && <p className="text-xs italic text-red-500">{errors.logo?.message}</p>}
        </div>
        <div className="relative mb-4 pb-2">
          <Label htmlfor={"bannerImage"} name="Banner Image" className="block mb-1 text-sm font-medium text-primary" />

          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="bannerImage"
            type="text"
            placeholder="Type the URL banner image"
            {...register("bannerImage")}
          />
          {errors.bannerImage && <p className="text-xs italic text-red-500">{errors.bannerImage?.message}</p>}
        </div>

        <input hidden type="text" value={user.id} {...register("administrator")} />

        <div className="relative mb-4 pb-2">
          <Label
            name={"Banner short description"}
            htmlfor={"description"}
            className="block mb-1 text-sm font-medium text-primary"
          />

          <Textarea
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Short description"
            rows={2}
            {...register("description")}
          />
          {errors.description && <p className="text-xs italic text-red-500">{errors.description?.message}</p>}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
          <div className="relative pb-2">
            <Label
              name={"Brand color"}
              htmlfor={"brandColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              defaultValue={"#344256"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="brandColor"
              placeholder="Select color to the h1 clor"
              {...register("brandColor")}
            />
            {errors.brandColor && <p className="text-xs italic text-red-500">{errors.brandColor?.message}</p>}
          </div>
          <div className="relative pb-2">
            <Label
              name={"Secondary color"}
              htmlfor={"secondary"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              defaultValue={"#f2f2f2"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="secondary"
              placeholder="Select color to the h1 clor"
              {...register("secondaryColor")}
            />
            {errors.secondaryColor && <p className="text-xs italic text-red-500">{errors.secondaryColor?.message}</p>}
          </div>
          <div className="relative pb-2">
            <Label
              name={"Background color"}
              htmlfor={"bgColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              defaultValue={"#ffffff"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="bgColor"
              placeholder="Select color to the h1 clor"
              {...register("bgColor")}
            />
            {errors.bgColor && <p className="text-xs italic text-red-500">{errors.bgColor?.message}</p>}
          </div>
          <div className="relative pb-2">
            <Label name={"Text color"} htmlfor={"textColor"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              defaultValue={"#ffffff"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="textColor"
              placeholder="Select color to the h1 clor"
              {...register("textColor")}
            />
            {errors.textColor && <p className="text-xs italic text-red-500">{errors.textColor?.message}</p>}
          </div>
          <div className="relative pb-2">
            <Label name={"Text h1 color"} htmlfor={"h1Color"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              defaultValue={"#344256"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="h1Color"
              placeholder="Select color to the h1 clor"
              {...register("h1Color")}
            />
            {errors.h1Color && <p className="text-xs italic text-red-500">{errors.h1Color?.message}</p>}
          </div>
          <div className="relative pb-2">
            <Label name={"Text h2 color"} htmlfor={"h2Color"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              defaultValue={"#344256"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="h2Color"
              placeholder="Select color to the h1 clor"
              {...register("h2Color")}
            />
            {errors.h2Color && <p className="text-xs italic text-red-500">{errors.h2Color?.message}</p>}
          </div>
          <div className="relative pb-2">
            <Label
              name={"Button color"}
              htmlfor={"buttonColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              defaultValue={"#5f46ff"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="buttonColor"
              placeholder="Select color to the h1 clor"
              {...register("buttonColor")}
            />
            {errors.buttonColor && <p className="text-xs italic text-red-500">{errors.buttonColor?.message}</p>}
          </div>
          <div className="relative pb-2">
            <Label
              name={"Button foreground"}
              htmlfor={"buttonForeground"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              defaultValue={"#ffffff"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="buttonForeground"
              placeholder="Select color to the h1 clor"
              {...register("buttonForeground")}
            />
            {errors.buttonForeground && (
              <p className="text-xs italic text-red-500">{errors.buttonForeground?.message}</p>
            )}
          </div>
        </div>

        <div className="relative mb-4 pb-2">
          <Label
            name={"About description"}
            htmlfor={"largeDescription"}
            className="block mb-1 text-sm font-medium text-primary"
          />

          <Textarea
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="largeDescription"
            placeholder="Large description"
            rows={4}
            {...register("largeDescription")}
          />
          {errors.largeDescription && <p className="text-xs italic text-red-500">{errors.largeDescription?.message}</p>}
        </div>

        <div className="relative mb-4 pb-2">
          <Label name={"Address"} htmlfor={"address"} className="block mb-1 text-sm font-medium text-primary" />

          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && <p className="text-xs italic text-red-500">{errors.address?.message}</p>}
        </div>

        <div className="relative mb-4 pb-2">
          <Label
            name={"  Bank card number"}
            htmlfor={"bankCardNumber"}
            className="block mb-1 text-sm font-medium text-primary"
          />

          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="bankCardNumber"
            type="text"
            max={16}
            placeholder="Bank card number"
            value={bankCardInput}
            autoComplete="off"
            {...register("bankCardNumber")}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              value = value.replace(/(\d{4})(?=\d)/g, "$1-");
              if (value.length > 20) {
                return;
              }
              setBankCardInput(value);
            }}
          />
          {errorBankCard.length > 5 && <p className="text-xs italic text-red-500">{errorBankCard}</p>}
        </div>

        <div className="relative mb-4 pb-2">
          <Label
            htmlfor={"background"}
            name={"Background Image URL (optional)"}
            className="block mb-1 text-sm font-medium text-primary"
          />

          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="background"
            type="text"
            placeholder="Background image"
            {...register("bgImage")}
          />
          {errors.bgImage && <p className="text-xs italic text-red-500">{errors.bgImage?.message}</p>}
        </div>

        <div className="my-6 mb-12 text-center">
          <ButtonSubmit isLoading={isLoading} text={"Create new disco"} />
        </div>
      </form>
    </>
  );
};

export default AddDiscos;
