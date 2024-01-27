import { z } from "zod";
import ButtomSubmit from "../buttons/ButtonSubmit";
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
import { endOfDay, format, startOfDay } from "date-fns";
import { ChevronDown } from "lucide-react";

const MAX_FILE_SIZE = 1048576;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const addTicketsSchema = z
  .object({
    discoId: z.string().min(1),
    category: z.enum(["VIP", "economy", "common"]),
    price: z.string().min(1, { message: "This field is required" }),
    expDate: z.string().optional(),
    shortDescription: z.string(),
    largeDescription: z.string().optional(),
    countInStock: z.string().min(1, { message: "This field is required" }),
    image: z.preprocess(
      (image: any) => {
        if (image.length === 0) {
          return undefined;
        } else {
          return image;
        }
      },
      z
        .any()
        .refine((file: any) => file?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
        .refine((file: any) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type), "Image format not supported.")
        .optional()
    ),
  })
  .refine(
    (data) => {
      const isEconomyOrCommon = data.category === "economy" || data.category === "VIP";
      if (isEconomyOrCommon) {
        return data.shortDescription != null && data.shortDescription.trim() !== "";
      }
      return true;
    },
    {
      message: "Short description is required for economy or common category",
      path: ["shortDescription"],
    }
  );

export type AddTicketSchema = z.infer<typeof addTicketsSchema>;

const AddTicketsForm = ({ discoId }: { discoId: string }) => {
  const [isActive, setIsActive] = useState(false);
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
      const expDate = (data.expDate = endOfDay(new Date(date)).toISOString());

      const formData = new FormData();
      formData.append("image", data?.image?.[0]);
      formData.append("expDate", expDate);
      formData.append("price", data.price);
      formData.append("countInStock", data.countInStock);
      formData.append("category", data.category);
      formData.append("shortDescription", data.shortDescription);
      data.largeDescription && formData.append("largeDescription", data.largeDescription);

      mutate({ formData: formData, discoId: data.discoId });
    } else {
      return;
    }
  };

  return (
    <div>
      <Button
        className={cn(isActive && "bg-yellow-600 hover:bg-yellow-500 ", "text-xs h-8 mb-2")}
        onClick={() => setIsActive((prev) => !prev)}
      >
        {isActive ? "Discard" : "Add Ticket"}
      </Button>
      <form
        encType="multipart/form-data"
        className={cn("md:w-1/2 lg:w-1/3 bg-black/20 p-3 rounded-md", !isActive && "hidden")}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2  gap-2">
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="category">
              category
            </label>
            <select
              defaultValue={""}
              className="h-10 pl-2 text-gray-500 bg-white rounded-md w-full text-xs outline-0"
              id="category"
              {...register("category")}
            >
              <option value="" disabled hidden>
                Select category
              </option>
              <option className="text-sm">VIP</option>
              <option className="text-sm">economy</option>
              <option className="text-sm">common</option>
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
                  disabled={(date) => date.valueOf() < startOfDay(new Date()).valueOf()}
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
          maxLength={120}
          className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Short description"
          id="shortDescription"
          {...register("shortDescription")}
        />
        {errors.shortDescription && <p className="text-xs italic text-red-500">{errors.shortDescription.message}</p>}
        <label className="block text-xs font-medium text-gray-200" htmlFor="largeDescription">
          optional large description
        </label>
        <textarea
          className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Large description"
          id="largeDescription"
          {...register("largeDescription")}
        />
        <div>
          <label className="block text-xs font-medium text-gray-200" htmlFor="picture">
            Picture
          </label>
          <Input id="image" type="file" accept=".png, .img, .jpg, .jpeg" {...register("image")} />
          {errors.image && <p className="text-xs italic text-red-500">{String(errors.image.message)}</p>}
        </div>

        <input {...register("discoId")} id="discoId" type="text" hidden defaultValue={discoId} />

        <ButtomSubmit className="mt-2" text="Add" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default AddTicketsForm;
