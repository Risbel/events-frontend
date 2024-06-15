import { DiscoDetail } from "@/services/getDisco";

import { useGetBannerImages } from "@/hooks/useGetBannerImages";
import { Loader2, PlusCircleIcon, X } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useAddBannerImages } from "@/hooks/useAddBannerImages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BannerImageItem from "./BannerImageItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MAX_FILE_SIZE = 1048576;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const bannerImagesSchema = z.preprocess(
  (image: any) => {
    if (image?.neme?.length === 0) {
      return undefined;
    } else {
      return image;
    }
  },
  z
    .any()
    .refine((file: any) => file?.name?.length !== 0, "This field is required")
    .refine(
      (file: any) => file?.name?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
    )
    .refine((file: any) => ACCEPTED_IMAGE_TYPES.includes(file?.name?.[0]?.type), "Image format not supported.")
    .optional()
);

const addBannerImagesSchema = z.object({
  discoDetailsId: z.string().min(1),
  bannerImages: z.array(bannerImagesSchema),
});

export type AddBannerImagesSchema = z.infer<typeof addBannerImagesSchema>;

const AddBannerImages = ({ discoDetail }: { discoDetail: DiscoDetail }) => {
  const { data } = useGetBannerImages(discoDetail.id);

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
    const formData = new FormData();

    data.bannerImages.map((img: any, i) => {
      formData.append(`bannerImage${i}`, img.name[0]);
    });

    formData.append("discoDetailsId", data.discoDetailsId);

    addBannerImages(formData);
    isSuccess && reset();
  };

  if (!data) {
    return;
  }

  return (
    <Dialog>
      <DialogTrigger className="text-start text-sm px-2 py-1 hover:bg-black hover:text-white rounded-sm w-full transition-colors">
        Banner images
      </DialogTrigger>
      <DialogContent className="h-5/6 w-full md:w-3/5 lg:w-3/5 text-left backdrop-blur-xl">
        <div className="flex h-full p-2 flex-col gap-4">
          <div>
            <h2 className="text-2xl pb-4 text-center">Banner images</h2>
          </div>
          <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
            <div className="grid md:grid-cols-2 gap-8">
              {data.map((image) => {
                return <BannerImageItem image={image} key={image.id} />;
              })}
            </div>

            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-center">
                {fields.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xl font-semibold">List of images</p>
                  </div>
                )}

                <div className="flex justify-center flex-wrap gap-6">
                  <input type="text" hidden value={discoDetail.id} {...register("discoDetailsId")} />
                  {fields.map((field, index) => {
                    return (
                      <div key={field.id} className="w-full">
                        <div className="flex relative items-center w-full">
                          <label
                            className="absolute -top-[20px] left-3 bg-white rounded-tl-md rounded-tr-md text-black px-1 text-sm font-semibold"
                            htmlFor="bannerImages"
                          >
                            Select an image
                          </label>

                          <Input
                            id="bannerImages"
                            type="file"
                            {...register(`bannerImages.${index}.name`)}
                            autoComplete="none"
                            accept=".img, .jpg, .jpeg"
                          />

                          {index >= 0 && (
                            <button className="absolute right-1 z-20" type="button" onClick={() => remove(index)}>
                              <X stroke="black" />
                            </button>
                          )}
                        </div>
                        {errors?.bannerImages?.[index] && (
                          <p className="text-xs italic text-red-500">
                            {String(errors.bannerImages[index]?.root?.message)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <Button
                    variant={"secondary"}
                    className="flex gap-2 justify-between rounded-lg pr-2 my-4 w-1/2 md:w-1/3 hover:opacity-90"
                    type="button"
                    onClick={() => append({})}
                  >
                    Add image <PlusCircleIcon />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                {fields.length > 0 && (
                  <Button
                    type="submit"
                    variant={"default"}
                    className="flex gap-2 justify-center rounded-lg pr-2 my-4 w-1/2"
                  >
                    Save {isLoadingAddImages && <Loader2 height={15} className="animate-spin" />}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBannerImages;
