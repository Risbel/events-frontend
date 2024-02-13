import { DiscoDetail, IUserBankCard } from "@/services/getDisco";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import { useGetBannerImages } from "@/hooks/useGetBannerImages";
import { Loader2, PenSquareIcon, PlusCircleIcon, PlusIcon, Trash2Icon, X } from "lucide-react";
import { useDeleteBannerImage } from "@/hooks/useDeleteBannerImage";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useAddBannerImages } from "@/hooks/useAddBannerImages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const bannerImagesSchema = z.object({
  name: z.string().min(1),
});

const addBannerImagesSchema = z.object({
  discoDetailsId: z.string().min(1),
  bannerImages: z.array(bannerImagesSchema),
});

export type AddBannerImagesSchema = z.infer<typeof addBannerImagesSchema>;

const AddBannerImages = ({
  discoBankCard,
  discoDetail,
}: {
  discoBankCard: IUserBankCard;
  discoDetail: DiscoDetail;
}) => {
  const { data } = useGetBannerImages(discoDetail.id);

  const { mutate: deleteBannerImage, isLoading } = useDeleteBannerImage();
  const { mutate: addBannerImages, isLoading: isLoadingAddImages, isSuccess } = useAddBannerImages();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AddBannerImagesSchema>({
    resolver: zodResolver(addBannerImagesSchema),
    defaultValues: {
      bannerImages: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "bannerImages",
    control,
  });

  const onSubmit: SubmitHandler<AddBannerImagesSchema> = (data) => {
    addBannerImages(data);
    isSuccess && reset();
  };

  if (!data) {
    return;
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger className="text-start text-sm px-2 py-1 hover:bg-black hover:text-white rounded-sm w-full transition-colors">
          Banner images
        </DialogTrigger>
        <DialogContent
          style={{
            background: `${discoDetail.discoColor.bgNavbarColor}`,
            border: `2px solid ${discoDetail.discoColor.navbarForeground}`,
          }}
          className="h-5/6 w-full md:w-3/5 lg:w-2/5 text-left backdrop-blur-xl"
        >
          <div className="flex h-full p-2 flex-col gap-4">
            <div>
              <h2 style={{ color: `${discoDetail.discoColor.navbarForeground}` }} className="text-2xl pb-4 text-center">
                Banner images
              </h2>
            </div>
            <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
              <input type="text" hidden value={discoDetail.id} {...register("discoDetailsId")} />
              {data.map((image) => {
                return (
                  <div key={image.id} className="flex justify-between place-items-start bg-white/20 rounded-xl">
                    <div className="flex">
                      <Image className="rounded-xl" width={300} height={200} src={image.image} alt="banner image" />
                      <p>{image?.alt}</p>
                    </div>

                    <div className="flex gap-2 p-8 rounded-md">
                      <button className="hover:scale-110">
                        <PenSquareIcon height={40} width={40} stroke={`${discoDetail.discoColor.navbarForeground}`} />
                      </button>

                      <button onClick={() => deleteBannerImage(image.id)} className="hover:scale-110">
                        {isLoading ? (
                          <Loader2 stroke={`${discoDetail.discoColor.navbarForeground}`} />
                        ) : (
                          <Trash2Icon
                            height={40}
                            width={40}
                            className="hover:stroke-red-700"
                            stroke={`${discoDetail.discoColor.navbarForeground}`}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* <button className="flex justify-center items-center p-4 rounded-xl bg-white/20 hover:bg-white/30 group cursor-pointer">
                <PlusIcon
                  height={40}
                  width={40}
                  className="hover:scale-110 transition-transform group-hover:scale-105"
                  strokeWidth="3px"
                  stroke={`${discoDetail.discoColor.navbarForeground}`}
                />
              </button> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center">
                  {fields.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xl font-semibold">List of images</p>
                    </div>
                  )}

                  <div className="flex justify-center flex-wrap gap-6">
                    {fields.map((field, index) => {
                      return (
                        <div key={field.id} className="flex relative items-center min-w-full">
                          <label
                            style={{
                              border: `2px solid ${discoDetail.discoColor.navbarForeground}`,
                              borderBottom: "0px",
                              color: `${discoDetail.discoColor.navbarForeground}`,
                            }}
                            className="absolute -top-[20px] left-3 bg-white rounded-tl-md rounded-tr-md text-black px-1 text-sm font-semibold"
                            htmlFor="bannerImages"
                          >
                            URL image
                          </label>

                          <Input
                            style={{ border: `2px solid ${discoDetail.discoColor.navbarForeground}` }}
                            type="text"
                            {...register(`bannerImages.${index}.name`)}
                            autoComplete="none"
                          />
                          {index >= 0 && (
                            <button className="absolute right-1 z-20" type="button" onClick={() => remove(index)}>
                              <X stroke={`${discoDetail.discoColor.navbarForeground}`} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      style={{
                        background: `${discoDetail.discoColor.navbarForeground}`,
                        color: `${discoDetail.discoColor.bgNavbarColor}`,
                      }}
                      variant={"secondary"}
                      className="flex gap-2 justify-between rounded-lg pr-2 my-4 w-1/2 md:w-1/3 hover:opacity-90"
                      type="button"
                      onClick={() => append({ name: "" })}
                    >
                      Add image <PlusCircleIcon />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    style={{
                      background: `${discoDetail.discoColor.navbarForeground}`,
                      color: `${discoDetail.discoColor.bgNavbarColor}`,
                    }}
                    variant={"secondary"}
                    className="flex gap-2 justify-center rounded-lg pr-2 my-4 w-1/2 hover:opacity-90"
                  >
                    Save {isLoadingAddImages && <Loader2 height={15} className="animate-spin" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBannerImages;
