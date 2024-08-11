import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateDisco from "@/hooks/useCreateDisco";
import ButtonSubmit from "../../buttons/ButtonSubmit";
import { useSession } from "next-auth/react";
import useFormPersist from "react-hook-form-persist";
import Progress from "./progress";
import Preview from "./preview";
import GeneralInfo from "./general";
import ColorPaletteGenerator from "./color-generator";
import Navbar from "./navbar";
import Banner from "./banner";
import About from "./about";
import Carousel from "./carousel";
import Tickets from "./tickets";
import Footer from "./footer";
import { addDiscoSchema, AddDiscoSchema } from "./schemas/addDiscoSchema";

const AddDiscos = () => {
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
    data.titleTextTickets && formData.append("titleTextTickets", data.titleTextTickets);
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
      <Preview values={values} />
      <div className="pt-20 px-2 md:px-8 bg-secondary">
        <h1 className="text-md md:text-2xl text-primary font-bold mb-8 p-2 pl-4 bg-primary-foreground rounded-md">
          Let&apos;s create your virtual space:
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col gap-8">
          <input autoComplete="off" hidden type="text" value={userId} {...register("administrator")} />

          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <GeneralInfo register={register} errors={errors} reset={reset} values={values} />
            <ColorPaletteGenerator values={values} brandColor={values.brandColor} reset={reset} />
            <Progress />
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <Navbar register={register} errors={errors} reset={reset} values={values} />
            <Banner register={register} errors={errors} reset={reset} values={values} />
          </div>

          <div className="grid grid-cols-12 gap-4">
            <About
              register={register}
              errors={errors}
              reset={reset}
              values={values}
              control={control}
              setValue={setValue}
            />

            <Carousel register={register} errors={errors} reset={reset} values={values} />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <Tickets register={register} errors={errors} reset={reset} values={values} />
            <Footer register={register} errors={errors} reset={reset} values={values} control={control} />
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
