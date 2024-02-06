import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCreateDisco from "@/hooks/useCreateDisco";
import ButtonSubmit from "../../../../components/buttons/ButtonSubmit";
import useGetMe from "@/hooks/useGetMe";
import Spinner from "../../../../components/loaders/Spinner";
import { useState } from "react";
import { Input, Label } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { cn } from "@/lib/shadcnUtils";

export type AddDiscoSchema = z.infer<typeof addDiscoSchema>;

const DividerWorkSpace = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="border border-primary w-full"></div>
      <p className="px-4 text-xl text-primary text-nowrap font-semibold">{text}</p>
      <div className="border border-primary w-full"></div>
    </div>
  );
};

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

  return (
    <>
      <h1 className="text-xl md:text-2xl text-primary font-bold pb-8">Let&apos;s create an Event: </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="relative mb-4 md:mr-2 md:w-1/4">
            <Label name={"Sponsor"} htmlfor={"discoName"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              autoComplete="off"
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="discoName"
              type="text"
              placeholder="e.g. Chocobar Caribe"
              {...register("name")}
            />
            {errors.name && <p className="text-xs italic text-red-500">{errors.name?.message}</p>}
          </div>
          <div className="relative mb-4 md:w-2/4">
            <Label name={"Slug URL"} htmlfor={"slug"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              autoComplete="off"
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="slug"
              type="text"
              placeholder="e.g. chocobar-caribe"
              {...register("slug")}
            />
            {errors.slug && <p className="text-xs italic text-red-500">{errors.slug?.message}</p>}
          </div>
          <div className="relative pb-2 w-1/4">
            <Label
              name={"Brand color"}
              htmlfor={"brandColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#522E00"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="brandColor"
              placeholder="Select color to the h1 color"
              {...register("brandColor")}
            />
            {errors.brandColor && <p className="text-xs italic text-red-500">{errors.brandColor?.message}</p>}
          </div>
        </div>

        <DividerWorkSpace text={"Navbar"} className={"pb-5"} />
        <div className="flex gap-2">
          <div className="relative mb-4 pb-2 w-2/3">
            <Label htmlfor={"logo"} name={"Image logo URL"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              autoComplete="off"
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="logo"
              type="text"
              placeholder="logo URL"
              {...register("logo")}
            />
            {errors.logo && <p className="text-xs italic text-red-500">{errors.logo?.message}</p>}
          </div>
          <div className="relative pb-2 w-1/3">
            <Label
              name={"Background color"}
              htmlfor={"bgNavbarColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#fac985"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="bgNavbarColor"
              placeholder="Select color to the h1 clor"
              {...register("bgNavbarColor")}
            />
            {errors.bgNavbarColor && <p className="text-xs italic text-red-500">{errors.bgNavbarColor?.message}</p>}
          </div>
          <div className="relative pb-2 w-1/3">
            <Label
              name={"Text color"}
              htmlfor={"navbarForeground"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#492a00"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="navbarForeground"
              placeholder="Select color to the h1 clor"
              {...register("navbarForeground")}
            />
            {errors.navbarForeground && (
              <p className="text-xs italic text-red-500">{errors.navbarForeground?.message}</p>
            )}
          </div>
        </div>

        <DividerWorkSpace text={"Home"} className={"pb-5"} />

        <div className="md:grid md:grid-cols-2">
          <div className="relative mb-4 md:mr-2">
            <Label
              name={"h1 text (event title)"}
              htmlfor={"h1Banner"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="h1Banner"
              type="text"
              placeholder="e.g. Chocolate event or whatever you want to highlight"
              {...register("h1Banner")}
            />
            {errors.h1Banner && <p className="text-xs italic text-red-500">{errors.h1Banner?.message}</p>}
          </div>
          <div className="relative pb-2">
            <Label
              name={"h1 color"}
              htmlfor={"h1BannerColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#ffffff"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="h1BannerColor"
              placeholder="Select color to the h1 clor"
              {...register("h1BannerColor")}
            />
            {errors.h1BannerColor && <p className="text-xs italic text-red-500">{errors.h1BannerColor?.message}</p>}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative mb-4 pb-2 w-2/3">
            <Label
              htmlfor={"bannerImage"}
              name="Banner Image"
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="bannerImage"
              type="text"
              placeholder="Type the URL banner image"
              {...register("bannerImage")}
            />
            {errors.bannerImage && <p className="text-xs italic text-red-500">{errors.bannerImage?.message}</p>}
          </div>
          <div className="relative pb-2 w-1/3">
            <Label
              name={"Gradient color"}
              htmlfor={"bannerGradientColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#492a00"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="bannerGradientColor"
              placeholder="Select color to the h1 clor"
              {...register("bannerGradientColor")}
            />
            {errors.bannerGradientColor && (
              <p className="text-xs italic text-red-500">{errors.bannerGradientColor?.message}</p>
            )}
          </div>
        </div>

        <input autoComplete="off" hidden type="text" value={user?.id} {...register("administrator")} />

        <div className="relative mb-4 pb-2">
          <Label
            name={"Banner short description"}
            htmlfor={"bannerDescription"}
            className="block mb-1 text-sm font-medium text-primary"
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
        <div className="relative pb-2 w-1/3">
          <Label
            name={"Banner description color"}
            htmlfor={"bannerDescriptionColor"}
            className="block mb-1 text-sm font-medium text-primary"
          />

          <Input
            autoComplete="off"
            defaultValue={"#ffffff"}
            type="color"
            className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="bannerDescriptionColor"
            placeholder="Select color to the h1 clor"
            {...register("bannerDescriptionColor")}
          />
          {errors.bannerDescriptionColor && (
            <p className="text-xs italic text-red-500">{errors.bannerDescriptionColor?.message}</p>
          )}
        </div>

        <DividerWorkSpace text={"About section"} className={"pb-5"} />

        <div className="relative mb-4 pb-2">
          <Label
            name={"About description"}
            htmlfor={"aboutDescription"}
            className="block mb-1 text-sm font-medium text-primary"
          />

          <Textarea
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="aboutDescription"
            placeholder="About Description"
            rows={4}
            {...register("aboutDescription")}
          />
          {errors.aboutDescription && <p className="text-xs italic text-red-500">{errors.aboutDescription?.message}</p>}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
          <div className="relative pb-2">
            <Label
              name={"Background color"}
              htmlfor={"bgAboutColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#fad29a"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="bgAboutColor"
              placeholder="Select color to the h1 clor"
              {...register("bgAboutColor")}
            />
            {errors.bgAboutColor && <p className="text-xs italic text-red-500">{errors.bgAboutColor?.message}</p>}
          </div>

          <div className="relative pb-2">
            <Label
              name={"Text about color"}
              htmlfor={"textAboutColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#492a00"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="textAboutColor"
              placeholder="Select color to the h1 clor"
              {...register("textAboutColor")}
            />
            {errors.textAboutColor && <p className="text-xs italic text-red-500">{errors.textAboutColor?.message}</p>}
          </div>

          <div className="relative pb-2">
            <Label
              name={"Button color"}
              htmlfor={"buttonColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#321d00"}
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
              autoComplete="off"
              defaultValue={"#ffc36e"}
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

        <DividerWorkSpace text={"Experiencies section"} className={"pb-5"} />

        <div className="flex gap-2 pb-4">
          <div className="relative pb-2 w-1/3">
            <Label
              name={"Background color"}
              htmlfor={"bgExperiencies"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#ffffff"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="bgExperiencies"
              placeholder="Select color to the h1 clor"
              {...register("bgExperiencies")}
            />
            {errors.bgExperiencies && <p className="text-xs italic text-red-500">{errors.bgExperiencies?.message}</p>}
          </div>
          <div className="relative pb-2 w-1/3">
            <Label
              name={"Title section color"}
              htmlfor={"experienciesH1Color"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#321d00"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="experienciesH1Color"
              placeholder="Select color to the h1 clor"
              {...register("experienciesH1Color")}
            />
            {errors.experienciesH1Color && (
              <p className="text-xs italic text-red-500">{errors.experienciesH1Color?.message}</p>
            )}
          </div>
        </div>

        <DividerWorkSpace text={"Tickets section"} className={"pb-5"} />

        <div className="flex gap-2 pb-4">
          <div className="relative pb-2 w-1/4">
            <Label
              name={"Background color"}
              htmlfor={"bgTicketsSection"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#ffffff"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="bgTicketsSection"
              placeholder="Select color to the h1 clor"
              {...register("bgTicketsSection")}
            />
            {errors.bgTicketsSection && (
              <p className="text-xs italic text-red-500">{errors.bgTicketsSection?.message}</p>
            )}
          </div>
          <div className="relative pb-2 w-1/4">
            <Label
              name={"Title section color"}
              htmlfor={"ticketH1Color"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#321d00"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="ticketH1Color"
              placeholder="Select color to the h1 clor"
              {...register("ticketH1Color")}
            />
            {errors.ticketH1Color && <p className="text-xs italic text-red-500">{errors.ticketH1Color?.message}</p>}
          </div>
          <div className="relative pb-2 w-1/4">
            <Label
              name={"Buttons color"}
              htmlfor={"buttonsTicketsColor"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#291800"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="buttonsTicketsColor"
              placeholder="Select color to the h1 clor"
              {...register("buttonsTicketsColor")}
            />
            {errors.buttonsTicketsColor && (
              <p className="text-xs italic text-red-500">{errors.buttonsTicketsColor?.message}</p>
            )}
          </div>
          <div className="relative pb-2 w-1/4">
            <Label
              name={"Buttons foreground"}
              htmlfor={"buttonTicketForeground"}
              className="block mb-1 text-sm font-medium text-primary"
            />

            <Input
              autoComplete="off"
              defaultValue={"#edc58d"}
              type="color"
              className="py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="buttonTicketForeground"
              placeholder="Select color to the h1 clor"
              {...register("buttonTicketForeground")}
            />
            {errors.buttonTicketForeground && (
              <p className="text-xs italic text-red-500">{errors.buttonTicketForeground?.message}</p>
            )}
          </div>
        </div>

        <DividerWorkSpace text={"Footer"} className={"pb-5"} />

        <div className="flex gap-2">
          <div className="relative mb-4 md:mr-2 w-1/2">
            <Label name={"phone number"} htmlfor={"phone"} className="block mb-1 text-sm font-medium text-primary" />

            <Input
              autoComplete="off"
              className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="e.g. +53 54353930"
              {...register("phone")}
            />
            {errors.phone && <p className="text-xs italic text-red-500">{errors.phone?.message}</p>}
          </div>
          <div className="relative mb-4 md:mr-2  w-1/2">
            <Label name={"email"} htmlfor={"discoName"} className="block mb-1 text-sm font-medium text-primary" />

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
          <Label name={"Address"} htmlfor={"address"} className="block mb-1 text-sm font-medium text-primary" />

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

        <div className="relative mb-4 pb-2">
          <Label
            name={"Bank card number"}
            htmlfor={"bankCardNumber"}
            className="block mb-1 text-sm font-medium text-primary"
          />

          <Input
            autoComplete="off"
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
            autoComplete="off"
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="background"
            type="text"
            placeholder="Background image"
            {...register("bgImage")}
          />
          {errors.bgImage && <p className="text-xs italic text-red-500">{errors.bgImage?.message}</p>}
        </div>

        <div className="my-6 mb-12 text-center">
          <ButtonSubmit isLoading={isLoading} text={"Create new Event"} />
        </div>
      </form>
    </>
  );
};

export default AddDiscos;

const addDiscoSchema = z.object({
  //general
  name: z.string().min(1, { message: "The name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  brandColor: z.string().min(1, { message: "Brand color required" }),
  //navbar
  logo: z.string().min(1, { message: "Logo is required" }),
  bgNavbarColor: z.string().min(1, { message: "Background is required" }), //new
  navbarForeground: z.string().min(1, { message: "Text color required" }), // new
  //home
  bannerImage: z.string().min(1, { message: "Banner URL image required" }),
  h1Banner: z.string().min(1, { message: "Text h1 required" }), //new replace h1Color
  h1BannerColor: z.string().min(1, { message: "h1 color required" }), //new
  bannerGradientColor: z.string().min(1, { message: "h1 color required" }), //new
  bannerDescription: z.string().min(1, { message: "Description required" }), //new replace description
  bannerDescriptionColor: z.string().min(1, { message: "Description color required" }), //new
  //about
  bgAboutColor: z.string().min(1, { message: "Background color required" }), //new
  aboutDescription: z.string().min(1, { message: "About description required" }), //new
  textAboutColor: z.string().min(1, { message: "About description required" }), //new
  buttonColor: z.string().min(1, { message: "Button color required" }),
  buttonForeground: z.string().min(1, { message: "ButtonForeground color required" }),
  //experiencies
  bgExperiencies: z.string().min(1, { message: "Background Experiencies required" }), //new
  experienciesH1Color: z.string().min(1, { message: "Experiencies title color required" }), //new
  //tickes
  bgTicketsSection: z.string().min(1, { message: "Secondary color required" }), //new
  ticketH1Color: z.string().min(1, { message: "Ticket title color required" }), //new
  buttonsTicketsColor: z.string().min(1, { message: "Button color required" }), //new
  buttonTicketForeground: z.string().min(1, { message: "Button color required" }), //new
  //footer
  phone: z.string().min(1, { message: "Phone number required" }), //new
  email: z.string().email().min(1, { message: "Email required" }),
  address: z.string().min(1, { message: "Address is required" }),
  administrator: z.string().min(1, { message: "Field must be atleast 8 characters" }),
  bankCardNumber: z.string().optional(),

  bgImage: z.string().optional(),
});
