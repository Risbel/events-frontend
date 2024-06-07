import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateCombo } from "@/hooks/useCreateCombo";
import { cn } from "@/lib/shadcnUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1048576;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const addCombosSchema = z.object({
  discoId: z.string().min(1),
  category: z.enum(["classic", "economy", "premium"]),
  price: z.string().min(1, { message: "required" }),
  countInStock: z.string().min(1, { message: "required" }),
  description: z.string().min(1, { message: "required" }),
  image: z
    .any()
    .optional()
    .refine((file: any) => file?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine((file: any) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type), "Image format not supported."),
});

export type AddCombosSchema = z.infer<typeof addCombosSchema>;

const AddCombosForm = ({ discoId }: { discoId: string }) => {
  const [isActive, setIsActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCombosSchema>({
    resolver: zodResolver(addCombosSchema),
  });

  const { mutate, isLoading, data } = useCreateCombo();

  const onSubmit: SubmitHandler<AddCombosSchema> = async (data) => {
    if (data?.image?.[0]) {
      const formData = new FormData();
      formData.append("image", data?.image?.[0]);
      formData.append("price", data.price);
      formData.append("countInStock", data.countInStock);
      formData.append("category", data.category);
      formData.append("description", data.description);
      mutate({ formData: formData, discoId: data.discoId });
    }
  };

  return (
    <>
      <Button
        variant={isActive ? "outline" : "default"}
        className={cn(isActive && "bg-secondary", "text-xs h-8 px-0 mb-2")}
        onClick={() => setIsActive((prev) => !prev)}
      >
        {isActive ? (
          <div className="flex gap-2 items-center pl-3 pr-2">
            <span>Descart</span> <X />
          </div>
        ) : (
          <div className="flex gap-2 items-center pl-3 pr-2">
            <span>Add pack</span> <PlusCircle />
          </div>
        )}
      </Button>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        className={cn("md:w-1/2 flex flex-col gap-2 bg-primary p-2 rounded-md mb-8", !isActive && "hidden")}
      >
        <input id="discoId" type="text" hidden value={discoId} {...register("discoId")} />
        <div className="flex gap-2">
          <div className="w-14">
            <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="countInStock">
              quantity
            </label>
            <Input
              className="pt-2 text-center text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
              placeholder="countInStock"
              defaultValue={1}
              type="number"
              min={1}
              id="countInStock"
              {...register("countInStock")}
            />
            {errors.countInStock && <p className="text-xs italic text-red-500">required</p>}
          </div>
          <div className="w-full">
            <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="category">
              Category
            </label>
            <select
              defaultValue={""}
              className="w-full h-10 pl-2 text-gray-black bg-white rounded-md text-xs outline-0"
              id="category"
              {...register("category")}
            >
              <option value="" disabled hidden>
                Select category
              </option>
              <option className="text-sm">classic</option>
              <option className="text-sm">economy</option>
              <option className="text-sm">premium</option>
            </select>
            {errors.category && <p className="text-xs italic text-red-500">required</p>}
          </div>
          <div className="w-20">
            <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="price">
              price
            </label>
            <Input
              className="w-20 pt-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
              placeholder="$"
              type="number"
              min={1}
              id="price"
              {...register("price")}
            />
            {errors.price && <p className="text-xs italic text-red-500">{errors.price.message}</p>}
          </div>
        </div>

        <div className="w-full">
          <label className="block text-xs font-medium text-gray-200" htmlFor="Description">
            description
          </label>
          <textarea
            className="w-full pt-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Description"
            id="description"
            {...register("description")}
          />
          {errors.description && <p className="text-xs italic text-red-500">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-200" htmlFor="picture">
            Picture
          </label>
          <Input id="image" type="file" accept=".png, .img, .jpg, .jpeg" {...register("image")} />
          {errors.image && <p className="text-xs italic text-red-500">Invalid image</p>}
        </div>
        <div className="flex justify-center">
          <Button variant={"outline"}>Add {isLoading && <Spinner diameter={8} stroke={"white"} />}</Button>
        </div>
      </form>
    </>
  );
};

export default AddCombosForm;
