import clsx from "clsx";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateDiscoTicket } from "@/hooks/useUpdateDiscoTicket";
import Spinner from "../loaders/Spinner";

const editTicketSchema = z.object({
  id: z.string().optional(),
  price: z.string().min(1, { message: "This field is required" }),
  countInStock: z.string().min(1, { message: "This field is required" }),
  description: z.string().optional(),
});

export type EditTicketSchema = z.infer<typeof editTicketSchema>;

const EditTicketsForm = ({
  id,
  price,
  countInStock,
  description,
}: {
  id: string;
  price: string;
  countInStock: string;
  description: string;
}) => {
  const [isActiveForm, setIsActiveForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTicketSchema>({
    resolver: zodResolver(editTicketSchema),
  });

  const { isLoading, mutate } = useUpdateDiscoTicket(setIsActiveForm);

  const onSubmit: SubmitHandler<EditTicketSchema> = (data) => {
    if (id) {
      data.id = id;
    } else {
      return;
    }

    mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          !isActiveForm && "hidden",
          "absolute translate-y-12 z-50  bg-black/50 backdrop-blur-md p-2 rounded-md"
        )}
      >
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
        {description !== "" && (
          <div>
            <label htmlFor="description" className="w-full block mb-1 text-xs font-medium text-gray-200">
              optional description
            </label>
            <textarea
              className="w-full py-2 pl-1 text-xs leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
              defaultValue={description}
              id="description"
              {...register("description")}
            />
          </div>
        )}
        <div className="pt-2">
          <Button className="flex items-center gap-2">
            Send
            {isLoading && <Spinner diameter={4} />}
          </Button>
        </div>
      </form>
      {!isActiveForm && <Button onClick={() => setIsActiveForm(true)}> edit</Button>}
      {isActiveForm && (
        <Button className="bg-yellow-600 hover:bg-yellow-500/80" onClick={() => setIsActiveForm(false)}>
          descart
        </Button>
      )}
    </div>
  );
};

export default EditTicketsForm;
