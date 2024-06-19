import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import useCreateDisco from "@/hooks/useCreateDisco";
import ButtonSubmit from "../../../../components/buttons/ButtonSubmit";
import { useState } from "react";
import { Input, Label } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { cn } from "@/lib/shadcnUtils";
import { AlignJustifyIcon, Eye, X } from "lucide-react";
import Preview from "@/components/dashboard/workspace/preview";
import ColorPicker from "@/components/dashboard/workspace/ColorPicker";
import Image from "next/image";
import ColorPaletteGenerator from "@/components/dashboard/workspace/ColorPaletGenerator";
import LabelColor from "@/components/dashboard/workspace/LabelColor";
import { useSession } from "next-auth/react";
import useFormPersist from "react-hook-form-persist";
import AddAboutTexts from "@/components/dashboard/workspace/AddAboutTexts";
import SocialSelector from "@/components/dashboard/workspace/SocialSelector";
import QuickLinks from "@/components/dashboard/workspace/QuickLinks";

export type AddDiscoSchema = z.infer<typeof addDiscoSchema>;

const AddDiscos = () => {
  const [isActive, setIsActive] = useState(false);
  const { data } = useSession();
  const userId = data?.user.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
    control,
  } = useForm<AddDiscoSchema>({
    resolver: zodResolver(addDiscoSchema),
    defaultValues: {
      layoutTextAbout: "variantA",
    },
  });

  useFormPersist("addDiscoForm", { watch, setValue });

  const { mutate: submitDataDisco, isLoading, isSuccess, status, isError } = useCreateDisco();
  const onSubmit: SubmitHandler<AddDiscoSchema> = (data) => {
    const formData = new FormData();

    formData.append("logo", data?.logo?.[0]);
    formData.append("bannerImage", data.bannerImage?.[0]);
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("brandColor", data.brandColor);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("bgNavbarColor", data.bgNavbarColor);
    formData.append("navbarForeground", data.navbarForeground);
    data.h1Banner && formData.append("h1Banner", data.h1Banner);
    formData.append("h1BannerColor", data.h1BannerColor);
    formData.append("bannerGradientColor", data.bannerGradientColor);
    data.bannerDescription && formData.append("bannerDescription", data.bannerDescription);
    formData.append("bannerDescriptionColor", data.bannerDescriptionColor);
    data.titleTextAbout && formData.append("titleTextAbout", data.titleTextAbout);
    formData.append("titleAboutColor", data.titleAboutColor);
    formData.append("bgAboutColor", data.bgAboutColor);
    formData.append("buttonColor", data.buttonColor);
    formData.append("buttonForeground", data.buttonForeground);
    data.titleTextCarousel && formData.append("titleTextCarousel", data.titleTextCarousel);
    formData.append("bgExperiencies", data.bgExperiencies);
    formData.append("experienciesH1Color", data.experienciesH1Color);
    formData.append("bgTicketsSection", data.bgTicketsSection);
    formData.append("ticketH1Color", data.ticketH1Color);
    formData.append("buttonsTicketsColor", data.buttonsTicketsColor);
    formData.append("buttonTicketForeground", data.buttonTicketForeground);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("layoutTextAbout", data.layoutTextAbout);
    formData.append("aboutTexts", JSON.stringify(data.aboutTexts));
    formData.append("socials", JSON.stringify(data.socials));
    formData.append("quickLinks", JSON.stringify(data.quickLinks));
    formData.append("bgFooterColor", data.bgFooterColor);
    formData.append("foregroundFooterColor", data.foregroundFooterColor);
    formData.append("administrator", data.administrator);

    submitDataDisco(formData);
  };

  const values = getValues();

  if (!data) {
    return;
  }

  return (
    <>
      <div className="fixed group cursor-pointer -translate-y-4 hover:-translate-y-2 transition-transform duration-300 z-30 right-12 top-8 bg-primary/80 backdrop-blur-sm hover:bg-primary rounded-b-3xl px-4 pt-10">
        <button onClick={() => setIsActive(true)} className="group-hover:scale-125 transition-transform">
          <Eye stroke="white" />
        </button>
      </div>
      <div className={cn("absolute z-40 h-full w-full bg-white", !isActive && "hidden")}>
        <button
          onClick={() => setIsActive(false)}
          className="fixed z-[60] right-2 top-16 p-2 cursor-pointer hover:scale-125 transition-transform bg-black/40  rounded-full "
        >
          <X stroke="white" height={25} width={25} />
        </button>
        <Preview values={values} />
      </div>
      <div className="pt-20 px-8 bg-secondary">
        <h1 className="text-xl md:text-2xl text-primary font-bold mb-8 p-2 bg-primary-foreground rounded-md">
          Let&apos;s create your webpage:{" "}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col gap-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="flex flex-col col-span-4 bg-primary-foreground p-6 rounded-md shadow-md">
              <p className="pb-4 text-xl text-center font-bold text-primary">General info</p>
              <div className="relative mb-4">
                <Label name={"Brand"} htmlfor={"discoName"} className="block mb-1 text-sm font-medium text-primary" />

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
                <Label name={"Link name"} htmlfor={"slug"} className="block mb-1 text-sm font-medium text-primary" />

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
                  <Label
                    name={"Start date"}
                    htmlfor={"startDate"}
                    className="block mb-1 text-sm font-medium text-primary"
                  />

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
                  <Label
                    name={"End date"}
                    htmlfor={"endDate"}
                    className="block mb-1 text-sm font-medium text-primary"
                  />

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
                  register={register}
                  id={"brandColor"}
                  defaultValue="#0e0046"
                  defaultColor={values.brandColor}
                  reset={reset}
                />
                {errors.brandColor && <p className="text-xs italic text-red-500">{errors.brandColor?.message}</p>}
              </div>
            </div>

            <ColorPaletteGenerator values={values} brandColor={values.brandColor} reset={reset} />
            <div className="flex justify-center col-start-9 col-span-4 bg-primary-foreground rounded-xl shadow-md overflow-hidden p-6">
              <Image
                src={"/progress-to-addDiscos.png"}
                width={250}
                height={250}
                alt="progress to addDiscos"
                className="object-cover w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col justify-between gap-2 col-span-1 bg-primary-foreground p-6 rounded-md shadow-md">
              <p className="pb-4 text-xl text-center font-bold text-primary">Navbar</p>
              <div className="relative">
                <Label htmlfor={"logo"} name={"Logo"} className="block mb-1 text-sm font-medium text-primary" />

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
                  defaultValue="#010e32"
                  defaultColor={values.bgNavbarColor}
                  register={register}
                  id="bgNavbarColor"
                />

                {errors.bgNavbarColor && <p className="text-xs italic text-red-500">{errors.bgNavbarColor?.message}</p>}
              </div>
              <div className="relative">
                <LabelColor text="Text color" htmlFor="navbarForeground" />
                <ColorPicker
                  defaultValue="#a8d4fb"
                  defaultColor={values.navbarForeground}
                  register={register}
                  id={"navbarForeground"}
                />

                {errors.navbarForeground && (
                  <p className="text-xs italic text-red-500">{errors.navbarForeground?.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 col-span-2 p-6 bg-primary-foreground rounded-md shadow-md">
              <p className="text-xl text-center font-bold text-primary mb-4">Banner</p>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <div className="relative">
                    <Label
                      name={"Event title"}
                      htmlfor={"h1Banner"}
                      className="block mb-1 text-sm font-medium text-primary"
                    />

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
                      defaultValue="#afc1f3"
                      id={"h1BannerColor"}
                      register={register}
                      defaultColor={values.h1BannerColor}
                    />

                    {errors.h1BannerColor && (
                      <p className="text-xs italic text-red-500">{errors.h1BannerColor?.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                  <div className="relative">
                    <Label
                      htmlfor={"bannerImage"}
                      name="Banner Image"
                      className="block mb-1 text-sm font-medium text-primary"
                    />

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

              <input autoComplete="off" hidden type="text" value={userId} {...register("administrator")} />
              <div className="flex items-center gap-4 border-t pt-4 mt-4">
                <div className="relative w-1/2 mt-6">
                  <Label
                    name={"Banner description"}
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
                <div className="relative w-1/2">
                  <LabelColor text="Text color" htmlFor="bannerDescriptionColor" />

                  <ColorPicker
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
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col justify-around col-span-2 bg-primary-foreground rounded-md p-6 shadow-md">
              <p className="text-xl text-center font-bold text-primary">About</p>

              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setValue("layoutTextAbout", "variantA")}
                  className={cn(
                    "w-10 p-1",
                    values.layoutTextAbout === "variantA" && "border-2 border-blue-300 rounded"
                  )}
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
                  className={cn(
                    "w-10 p-1",
                    values.layoutTextAbout === "variantB" && "border-2 border-blue-300 rounded"
                  )}
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
                  className={cn(
                    "w-10 p-1",
                    values.layoutTextAbout === "variantC" && "border-2 border-blue-300 rounded"
                  )}
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
                  className={cn(
                    "w-10 p-1",
                    values.layoutTextAbout === "variantD" && "border-2 border-blue-300 rounded"
                  )}
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
                  className={cn(
                    "w-10 p-1",
                    values.layoutTextAbout === "variantE" && "border-2 border-blue-300 rounded"
                  )}
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
              <div className="flex gap-4 w-full">
                <div className="relative w-full">
                  <Label
                    name={"Title text"}
                    htmlfor={"titleTextAbout"}
                    className="block mb-1 text-sm font-medium text-primary"
                  />

                  <Input
                    className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="titleTextAbout"
                    placeholder="Title text"
                    {...register("titleTextAbout")}
                  />
                  {errors.titleTextAbout && (
                    <p className="text-xs italic text-red-500">{errors.titleTextAbout?.message}</p>
                  )}
                </div>

                <AddAboutTexts register={register} values={values} control={control} setValue={setValue} />
              </div>

              <div className="flex gap-4 pb-4">
                <div className="relative pb-2">
                  <LabelColor htmlFor="bgAboutColor" text="Background color" />
                  <ColorPicker
                    defaultValue="#0e0046"
                    id={"bgAboutColor"}
                    register={register}
                    defaultColor={values.bgAboutColor}
                  />
                  {errors.bgAboutColor && <p className="text-xs italic text-red-500">{errors.bgAboutColor?.message}</p>}
                </div>

                <div className="relative pb-2">
                  <LabelColor htmlFor="titleAboutColor" text="Title about color" />
                  <ColorPicker
                    defaultValue="#0e0046"
                    register={register}
                    id={"titleAboutColor"}
                    defaultColor={values.titleAboutColor}
                  />
                  {errors.titleAboutColor && (
                    <p className="text-xs italic text-red-500">{errors.titleAboutColor?.message}</p>
                  )}
                </div>

                <div className="h-28 w-0 border-l" />

                <div className="relative pb-2">
                  <LabelColor text="Button color" htmlFor="buttonColor" />
                  <ColorPicker
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
                    defaultValue="#0e0046"
                    register={register}
                    id={"buttonForeground"}
                    defaultColor={values.buttonForeground}
                  />
                  {errors.buttonForeground && (
                    <p className="text-xs italic text-red-500">{errors.buttonForeground?.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-primary-foreground rounded-md p-6 shadow-md">
              <div className="flex flex-col gap-2 pb-4">
                <p className="text-xl text-center font-bold text-primary mb-4">Carousel</p>
                <div className="relative">
                  <Label
                    name={"Title text"}
                    htmlfor={"titleTextCarousel"}
                    className="block mb-1 text-sm font-medium text-primary"
                  />

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
                <div className="relative pb-2">
                  <LabelColor htmlFor="bgExperiencies" text="Background color" />
                  <ColorPicker
                    defaultValue="#a7d8f5"
                    register={register}
                    id={"bgExperiencies"}
                    defaultColor={values.bgExperiencies}
                  />

                  {errors.bgExperiencies && (
                    <p className="text-xs italic text-red-500">{errors.bgExperiencies?.message}</p>
                  )}
                </div>
                <div className="relative pb-2">
                  <LabelColor htmlFor="experienciesH1Color" text="Title color" />
                  <ColorPicker
                    defaultValue="#a7d8f5"
                    register={register}
                    id={"experienciesH1Color"}
                    defaultColor={values.experienciesH1Color}
                  />
                  {errors.experienciesH1Color && (
                    <p className="text-xs italic text-red-500">{errors.experienciesH1Color?.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-primary-foreground rounded-md shadow-md">
              <p className="text-xl text-center font-bold text-primary mb-4">Tickets</p>
              <div className="flex gap-2 pb-4">
                <div className="w-1/2">
                  <div className="relative">
                    <LabelColor htmlFor="bgTicketsSection" text="Background color" />
                    <ColorPicker
                      defaultValue="#ffffff"
                      id={"bgTicketsSection"}
                      register={register}
                      defaultColor={values.bgTicketsSection}
                    />
                    {errors.bgTicketsSection && (
                      <p className="text-xs italic text-red-500">{errors.bgTicketsSection?.message}</p>
                    )}
                  </div>
                  <div className="relative">
                    <LabelColor htmlFor="ticketH1Color" text="Title section color" />
                    <ColorPicker
                      defaultValue="#0b023d"
                      register={register}
                      id="ticketH1Color"
                      defaultColor={values.ticketH1Color}
                    />
                    {errors.ticketH1Color && (
                      <p className="text-xs italic text-red-500">{errors.ticketH1Color?.message}</p>
                    )}
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="relative">
                    <LabelColor htmlFor="buttonsTicketsColor" text="Buttons color" />
                    <ColorPicker
                      defaultValue="#0e0046"
                      register={register}
                      id={"buttonsTicketsColor"}
                      defaultColor={values.buttonsTicketsColor}
                    />

                    {errors.buttonsTicketsColor && (
                      <p className="text-xs italic text-red-500">{errors.buttonsTicketsColor?.message}</p>
                    )}
                  </div>
                  <div className="relative">
                    <LabelColor htmlFor="buttonTicketForeground" text="Buttons foreground" />
                    <ColorPicker
                      defaultValue="#ffffff"
                      register={register}
                      id={"buttonTicketForeground"}
                      defaultColor={values.buttonTicketForeground}
                    />
                    {errors.buttonTicketForeground && (
                      <p className="text-xs italic text-red-500">{errors.buttonTicketForeground?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-primary-foreground p-6 rounded-md shadow-md">
              <p className="text-xl text-center font-bold text-primary mb-4">Footer</p>
              <div className="flex gap-2">
                <div className="relative mb-4 md:mr-2 w-1/2">
                  <Label
                    name={"phone number"}
                    htmlfor={"phone"}
                    className="block mb-1 text-sm font-medium text-primary"
                  />

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
                    defaultValue="#07011e"
                    id={"bgFooterColor"}
                    register={register}
                    defaultColor={values.bgFooterColor}
                  />

                  {errors.bgFooterColor && (
                    <p className="text-xs italic text-red-500">{errors.bgFooterColor?.message}</p>
                  )}
                </div>
                <div className="relative w-1/2">
                  <LabelColor text="Text color" htmlFor="foregroundFooterColor" />

                  <ColorPicker
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
          </div>

          <div className="my-6 mb-12 text-center">
            <ButtonSubmit
              isSuccess={isSuccess}
              status={status}
              isLoading={isLoading}
              isError={isError}
              text={"Create new Event"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDiscos;

const aboutTextSchema = z.object({
  title: z.string().optional(),
  titleColor: z.string(),
  titleAlign: z.enum(["center", "left", "right", "justify"]),
  text: z.string(),
  textAlign: z.enum(["center", "left", "right", "justify"]),
  textColor: z.string(),
  textWeight: z.string(),
});

const addDiscoSchema = z.object({
  //general
  name: z.string().min(1, { message: "The name is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .refine((data) => /^[A-Za-z0-9_-]+$/.test(data), {
      message: "Only [a-z], [A-Z], [-] and [_] allowed",
    }),
  brandColor: z.string().min(1, { message: "Brand color required" }),
  startDate: z.string().min(1, { message: "Start date required" }),
  endDate: z.string().min(1, { message: "End date required" }),
  //navbar
  logo: z.any().refine((file) => file?.[0]?.name, `Image required`),
  bgNavbarColor: z.string().min(1, { message: "Background is required" }),
  navbarForeground: z.string().min(1, { message: "Text color required" }),
  //home
  bannerImage: z.any().refine((file) => file?.[0]?.name, `Image required`),
  h1Banner: z.string().min(2, "Invalid title").optional().or(z.literal("")),
  h1BannerColor: z.string().min(1, { message: "h1 color required" }),
  bannerGradientColor: z.string().min(1, { message: "h1 color required" }),
  bannerDescription: z.string().min(2, "Invalid description").optional().or(z.literal("")),
  bannerDescriptionColor: z.string().min(1, { message: "Description color required" }),
  //about
  layoutTextAbout: z.enum(["variantA", "variantB", "variantC", "variantD", "variantE"]), //new
  titleAboutColor: z.string().min(1, { message: "Title about color required" }), //new
  titleTextAbout: z.string().min(1, { message: "Title text required" }).optional().or(z.literal("")),
  bgAboutColor: z.string().min(1, { message: "Background color required" }),
  aboutTexts: z.array(aboutTextSchema), //new
  buttonColor: z.string().min(1, { message: "Button color required" }),
  buttonForeground: z.string().min(1, { message: "ButtonForeground color required" }),
  //experiencies
  titleTextCarousel: z.string().min(1, { message: "Title text required" }).optional().or(z.literal("")),
  bgExperiencies: z.string().min(1, { message: "Background Experiencies required" }),
  experienciesH1Color: z.string().min(1, { message: "Experiencies title color required" }),
  //tickes
  bgTicketsSection: z.string().min(1, { message: "Secondary color required" }),
  ticketH1Color: z.string().min(1, { message: "Ticket title color required" }),
  buttonsTicketsColor: z.string().min(1, { message: "Button color required" }),
  buttonTicketForeground: z.string().min(1, { message: "Button color required" }),
  //footer
  phone: z.string().min(1, { message: "Phone number required" }),
  email: z.string().email().min(1, { message: "Email required" }),
  address: z.string().min(1, { message: "Address is required" }),
  socials: z.array(
    z.object({
      url: z.string().optional(),
    })
  ),
  quickLinks: z.array(
    z.object({
      url: z.string().min(1, { message: "Url required" }),
      name: z.string().min(1, { message: "Name required" }),
    })
  ),
  bgFooterColor: z.string().min(1, { message: "Background footer color required" }),
  foregroundFooterColor: z.string().min(1, { message: "Foreground footer color required" }),
  administrator: z.string().min(1, { message: "Field must be atleast 8 characters" }),
});
