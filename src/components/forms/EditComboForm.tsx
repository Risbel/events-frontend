import { cn } from "@/lib/shadcnUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "../loaders/Spinner";
import { z } from "zod";
import { useEditCombos } from "@/hooks/useEditCombos";
import { ICombo } from "@/services/getCombosByDiscoId";
import { Loader2 } from "lucide-react";

const editCombosSchema = z.object({
  category: z.enum(["classic", "economy", "premium"]),
  price: z.string().min(1, { message: "required" }),
  countInStock: z.string().min(1, { message: "required" }),
  description: z.string().min(1, { message: "required" }),
});

export type EditCombosSchema = z.infer<typeof editCombosSchema>;

const EditComboForm = ({ combo }: { combo: ICombo }) => {
  const { id } = combo;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditCombosSchema>({
    resolver: zodResolver(editCombosSchema),
  });

  const { mutate, isLoading } = useEditCombos();

  const onSubmit: SubmitHandler<EditCombosSchema> = async (data) => {
    mutate({ id, data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("md:w-1/2 flex flex-col gap-2 bg-primary p-2 rounded-md mb-8")}
    >
      <div className="flex gap-2">
        <div className="w-14">
          <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="countInStock">
            stock
          </label>
          <Input
            className="pt-2 text-center text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="countInStock"
            defaultValue={combo.countInStock}
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
            defaultValue={combo.category}
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
            defaultValue={combo.price}
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
          defaultValue={combo.comboDetail.description}
          className="w-full pt-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Description"
          rows={8}
          id="description"
          {...register("description")}
        />
        {errors.description && <p className="text-xs italic text-red-500">{errors.description.message}</p>}
      </div>
      <div className="flex justify-center">
        <Button variant={"outline"}>{isLoading ? <Loader2 className="animate-spin" /> : <span>Update</span>}</Button>
      </div>
    </form>
  );
};

export default EditComboForm;
