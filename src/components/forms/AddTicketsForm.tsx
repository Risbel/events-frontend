import { z } from "zod";
import ButtomSubmit from "../buttons/ButtomSubmit";
import ButtomDiscart from "../buttons/ButtonDiscart";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateDiscoTickets } from "@/hooks/useCreateDiscoTickets";
import { zodResolver } from "@hookform/resolvers/zod";

const addTicketsSchema = z.object({
  discoId: z.string().optional(),
  category: z.enum(["VIP", "economy", "common"]),
  price: z.string().min(1, { message: "This field is required" }),
  description: z.string().optional(),
  quantity: z.string().min(1, { message: "This field is required" }),
});

export type AddTicketSchema = z.infer<typeof addTicketsSchema>;

const AddTicketsForm = ({
  discoId,
  setIsActiveForm,
}: {
  discoId: string;
  setIsActiveForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTicketSchema>({
    resolver: zodResolver(addTicketsSchema),
  });

  const { mutate, isLoading } = useCreateDiscoTickets(discoId);
  const onSubmit: SubmitHandler<AddTicketSchema> = (data) => {
    if (discoId) {
      data.discoId = discoId;
    } else {
      return;
    }
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="category">
        category
      </label>
      <select
        defaultValue={""}
        className="w-40 h-10 pl-2 text-black bg-white rounded-md"
        id="category"
        {...register("category")}
      >
        <option value="" disabled hidden>
          select a category
        </option>
        <option className="bg-black/10">VIP</option>
        <option className="bg-black/10">economy</option>
        <option className="bg-black/10">common</option>
      </select>
      {errors.category && <p className="text-xs italic text-red-500 mt-2">Please select some category</p>}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="price">
            price
          </label>
          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="$"
            type="number"
            min={1}
            id="price"
            {...register("price")}
          />
          {errors.price && <p className="text-xs italic text-red-500 mt-2">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="quantity">
            seats / quantity
          </label>
          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Quantity"
            defaultValue={1}
            type="number"
            min={1}
            id="quantity"
            {...register("quantity")}
          />
        </div>
      </div>
      <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="description">
        optional description
      </label>
      <textarea
        className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
        placeholder="Description"
        id="description"
        {...register("description")}
      />

      <div className="flex gap-2">
        <ButtomSubmit text="add" isLoading={isLoading} />
        <ButtomDiscart setIsActiveForm={setIsActiveForm} text={"discart"} />
      </div>
    </form>
  );
};

export default AddTicketsForm;
