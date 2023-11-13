import { z } from "zod";
import ButtomSubmit from "../buttons/ButtomSubmit";
import ButtomDiscart from "../buttons/ButtonDiscart";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateDiscoTickets } from "@/hooks/useCreateDiscoTickets";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { cn } from "@/lib/shadcnUtils";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";

const addTicketsSchema = z.object({
  discoId: z.string().min(1),
  category: z.enum(["VIP", "economy", "common"]),
  price: z.string().min(1, { message: "This field is required" }),
  expDate: z.date().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  countInStock: z.string().min(1, { message: "This field is required" }),
  image: z.string().optional(),
});

export type AddTicketSchema = z.infer<typeof addTicketsSchema>;

const AddTicketsForm = ({
  discoId,
  setIsActiveForm,
}: {
  discoId: string;
  setIsActiveForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [date, setDate] = useState<Date>();
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTicketSchema>({
    resolver: zodResolver(addTicketsSchema),
  });

  const { mutate, isLoading } = useCreateDiscoTickets(discoId);
  const onSubmit: SubmitHandler<AddTicketSchema> = (data) => {
    if (date) {
      data.expDate = date;
      mutate(data);
      reset();
    } else {
      return;
    }
  };

  return (
    <form className="bg-black/20 p-3 rounded-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2  gap-2">
        <div>
          <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="category">
            category
          </label>
          <select
            defaultValue={""}
            className="h-10 pl-2 text-gray-800 bg-white rounded-md w-full md:text-base outline-0"
            id="category"
            {...register("category")}
          >
            <option value="" disabled hidden>
              Select category
            </option>
            <option className="text-md">VIP</option>
            <option className="text-md">economy</option>
            <option className="text-md">common</option>
          </select>
          {errors.category && <p className="text-xs italic text-red-500 mt-2">Please select some category</p>}
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="expDate">
            day of use
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setIsOpenPopover((prev) => !prev)}
                variant={"outline"}
                className={cn(
                  "flex justify-between w-full font-normal text-xs pl-1 pr-0",
                  !date && "text-muted-foreground"
                )}
              >
                <div className="pr-1">📆</div>
                {date ? format(date, "PP") : <span>Pick a date</span>}
                <ChevronDown className={cn("h-4 transition-transform duration-300", isOpenPopover && "rotate-180")} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-1 -translate-x-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date.valueOf() < new Date().setHours(0, 0, 0, 0)}
              />
            </PopoverContent>
          </Popover>
          {errors.expDate && <p className="text-xs italic text-red-500 mt-2">{errors.expDate.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2  gap-2">
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
          <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="countInStock">
            seats / quantity
          </label>
          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="countInStock"
            defaultValue={1}
            type="number"
            min={1}
            id="countInStock"
            {...register("countInStock")}
          />
        </div>
      </div>

      <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="shortDescription">
        optional short description
      </label>
      <textarea
        className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
        placeholder="Short description"
        id="shortDescription"
        {...register("shortDescription")}
      />
      <label className="block text-xs font-medium text-gray-200" htmlFor="description">
        optional large description
      </label>
      <textarea
        className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
        placeholder="Description"
        id="description"
        {...register("description")}
      />
      <div className="mb-2">
        <label className="block text-xs font-medium text-gray-200" htmlFor="image">
          optional image
        </label>
        <Input
          className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Insert Image URL"
          type="text"
          id="image"
          {...register("image")}
        />
      </div>
      <input {...register("discoId")} id="discoId" type="text" hidden defaultValue={discoId} />

      <div className="flex gap-2">
        <ButtomSubmit text="add" isLoading={isLoading} />
        <ButtomDiscart setIsActiveForm={setIsActiveForm} text={"discart"} />
      </div>
    </form>
  );
};

export default AddTicketsForm;
