import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEventNotification } from "@/hooks/useCreateEventNotification";
import { cn } from "@/lib/shadcnUtils";
import { DataDisco } from "@/services/getDisco";
import { zodResolver } from "@hookform/resolvers/zod";
import { endOfDay, format } from "date-fns";
import { CheckCircle2, Loader2, PlusCircle, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1048576;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const addNotificationsSchema = z.object({
  eventId: z.string().min(1),
  userId: z.string().min(1),
  type: z.enum(["promo", "alert", "info"], {
    required_error: "You need to select a notification type.",
  }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  expDate: z
    .date()
    .min(endOfDay(new Date()), { message: `Min date is ${format(endOfDay(new Date()), "yyyy-MM-dd HH:mm:ss")}` }),
  image: z
    .any()
    .refine((file: any) => !file || file.length === 0 || file[0].size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine(
      (file: any) => !file || file.length === 0 || ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Image format not supported."
    )
    .optional(),
});

export type AddNotificationsSchema = z.infer<typeof addNotificationsSchema>;

const AddNotification = ({ eventId }: { eventId: string }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const { data: session } = useSession();
  const { mutate, isSuccess, isLoading } = useCreateEventNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AddNotificationsSchema>({
    resolver: zodResolver(addNotificationsSchema),
    defaultValues: { type: "info" },
  });

  const onSubmit: SubmitHandler<AddNotificationsSchema> = (data) => {
    const formData = new FormData();
    formData.append("eventId", data.eventId);
    formData.append("type", data.type);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("expDate", data.expDate.toISOString());
    formData.append("image", data?.image?.[0]);
    formData.append("userId", data.userId);

    mutate(
      { formData: formData, eventId: data.eventId },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const handleClick = () => {
    setIsOpenForm((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Button type="button" onClick={handleClick} className={cn("flex gap-2", isOpenForm && "hidden")}>
        <span>Add new notification</span> <PlusCircle />
      </Button>
      <div></div>
      <form
        className={cn(isOpenForm ? "block" : "hidden", "w-full border p-4 rounded-lg shadow-md")}
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex justify-end">
          <button className="hover:" onClick={handleClick}>
            <X />
          </button>
        </div>

        <input type="text" hidden value={eventId} {...register("eventId")} />
        <input type="text" hidden value={session?.user.id} {...register("userId")} />
        <div className="flex gap-4 py-2">
          {["info", "promo", "alert"].map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input type="radio" value={type} {...register("type")} className="hidden" />
              <div className="w-4 h-4 mr-2 border-2 border-primary rounded-md flex items-center justify-center">
                <div className={`w-2 h-2 rounded-md ${watch("type") === type ? "bg-primary" : ""}`}></div>
              </div>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Input type="text" {...register("title")} placeholder="Title" />
          {errors.title && <p className="text-xs italic text-red-500">title required</p>}
          <Textarea rows={2} {...register("description")} placeholder="Description" />
          {errors.description && <p className="text-xs italic text-red-500">description required</p>}

          <div className="flex flex-col">
            <label htmlFor="expDate" className="pl-2 text-sm">
              Expiration date
            </label>
            <input
              id="expDate"
              className="py-2 border border-black rounded-md px-2"
              type="datetime-local"
              {...register("expDate", { valueAsDate: true })}
            />
          </div>
          {errors.expDate && <p className="text-xs italic text-red-500">{errors.expDate.message}</p>}

          <div className="flex flex-col">
            <label htmlFor="image" className="pl-2 text-sm">
              Upload image
            </label>
            <Input id="image" type="file" accept=".png, .img, .jpg, .jpeg" {...register("image")} />
          </div>
          {errors.image && <p className="text-xs italic text-red-500">{String(errors.image.message)}</p>}
        </div>

        <div className="flex justify-center">
          <Button type="submit" variant={"default"} className="flex gap-2 justify-center rounded-lg pr-2 my-4 w-1/2">
            Submit {isLoading ? <Loader2 height={15} className="animate-spin" /> : isSuccess && <CheckCircle2 />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNotification;
