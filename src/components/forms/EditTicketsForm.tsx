import clsx from "clsx";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateDiscoTicket } from "@/hooks/useUpdateDiscoTicket";
import Spinner from "../loaders/Spinner";
import { Loader2 } from "lucide-react";

const editTicketSchema = z.object({
  id: z.string().optional(),
  price: z.string().min(1, { message: "This field is required" }),
  countInStock: z.string().min(1, { message: "This field is required" }),
  shortDescription: z.string().optional(),
});

export type EditTicketSchema = z.infer<typeof editTicketSchema>;

const EditTicketsForm = ({
  id,
  price,
  countInStock,
  shortDescription,
}: {
  id: string;
  price: string;
  countInStock: string;
  shortDescription: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTicketSchema>({
    resolver: zodResolver(editTicketSchema),
  });

  const { isLoading, mutate } = useUpdateDiscoTicket();
  const onSubmit: SubmitHandler<EditTicketSchema> = (data) => {
    if (id) {
      data.id = id;
    } else {
      return;
    }

    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("z-50 bg-primary p-2 rounded-md w-full")}>
      <div>
        <label htmlFor="price" className="block mb-1 text-xs font-medium text-gray-200">
          price
        </label>
        <Input defaultValue={price} type="number" placeholder="$" min={1} id="price" {...register("price")} />
        {errors.price && <p className="text-xs italic text-red-500 mt-2">{errors.price.message}</p>}
      </div>
      <div>
        <label htmlFor="countInStock" className="block mb-1 text-xs font-medium text-gray-200">
          seats / quantity
        </label>
        <Input
          defaultValue={countInStock}
          type="number"
          placeholder="seats / quantity"
          min={0}
          id="countInStock"
          {...register("countInStock")}
        />
        {errors.countInStock && <p className="text-xs italic text-red-500 mt-2">{errors.countInStock.message}</p>}
      </div>
      {
        <div>
          <label htmlFor="shortDescription" className="w-full block mb-1 text-xs font-medium text-gray-200">
            optional short description
          </label>
          <textarea
            className="w-full py-2 pl-1 text-xs leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            defaultValue={shortDescription}
            id="shortDescription"
            {...register("shortDescription")}
          />
        </div>
      }
      <div className="pt-2">
        <Button variant="secondary" className="flex items-center gap-2">
          {isLoading ? <Loader2 className="animate-spin" /> : <span>Send</span>}
        </Button>
      </div>
    </form>
  );
};

export default EditTicketsForm;
