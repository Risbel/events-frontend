import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateCarouselImages } from "@/hooks/useCreateCarouselImages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircleIcon, X } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1048576;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const carouselImagesSchema = z.preprocess(
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

const createCarouselImagesSchema = z.object({
  discoDetailsId: z.string().min(1),
  carouselImages: z.array(carouselImagesSchema),
});

export type AddCarouselImagesSchema = z.infer<typeof createCarouselImagesSchema>;

const AddCarouselImageForm = ({ discoDetailId }: { discoDetailId: string }) => {
  const { mutate: addCarouselImages, isLoading: isLoadingAddImages, isSuccess } = useCreateCarouselImages();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AddCarouselImagesSchema>({
    resolver: zodResolver(createCarouselImagesSchema),
    defaultValues: {
      carouselImages: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "carouselImages",
    control,
  });

  const onSubmit: SubmitHandler<AddCarouselImagesSchema> = (data) => {
    const formData = new FormData();
    data.carouselImages.map((img: any, i: any) => {
      formData.append(`bannerImage${i}`, img.name[0]);
    });

    formData.append("discoDetailsId", data.discoDetailsId);

    addCarouselImages(formData);
    isSuccess && reset();
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center">
        {fields.length > 0 && (
          <div className="mb-6">
            <p className="text-xl font-semibold">List of images</p>
          </div>
        )}
        <div className="flex justify-center flex-wrap gap-6">
          <input type="text" hidden value={discoDetailId} {...register("discoDetailsId")} />
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="w-full">
                <div className="flex relative items-center w-full">
                  <label
                    className="absolute -top-[20px] left-3 bg-white rounded-tl-md rounded-tr-md text-black px-1 text-sm font-semibold"
                    htmlFor="carouselImages"
                  >
                    Select an image
                  </label>

                  <Input
                    id="carouselImages"
                    type="file"
                    {...register(`carouselImages.${index}.name`)}
                    autoComplete="none"
                    accept=".img, .jpg, .jpeg"
                  />

                  {index >= 0 && (
                    <button className="absolute right-1 z-20" type="button" onClick={() => remove(index)}>
                      <X stroke="black" />
                    </button>
                  )}
                </div>
                {errors?.carouselImages?.[index] && (
                  <p className="text-xs italic text-red-500">{String(errors.carouselImages[index]?.root?.message)}</p>
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
            className="flex gap-2 justify-center rounded-lg pr-2 my-4 w-1/2 hover:opacity-90"
          >
            Save {isLoadingAddImages && <Loader2 height={15} className="animate-spin" />}
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddCarouselImageForm;
