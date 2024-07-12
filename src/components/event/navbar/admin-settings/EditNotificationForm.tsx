import { cn } from "@/lib/shadcnUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ICombo } from "@/services/getCombosByDiscoId";
import { Check, CheckCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditNotification } from "@/hooks/useEditNotification";
import { endOfDay, format } from "date-fns";
import { INotifications } from "@/services/getNotificationsByEventId";
import { Textarea } from "@/components/ui/textarea";

const editNotificationSchema = z.object({
  type: z.enum(["promo", "alert", "info"], {
    required_error: "You need to select a notification type.",
  }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  expDate: z
    .date()
    .min(endOfDay(new Date()), { message: `Min date is ${format(endOfDay(new Date()), "yyyy-MM-dd HH:mm:ss")}` }),
});

export type EditNotificationSchema = z.infer<typeof editNotificationSchema>;

const EditNotificationForm = ({ notification }: { notification: INotifications }) => {
  const { id } = notification;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EditNotificationSchema>({
    resolver: zodResolver(editNotificationSchema),
    defaultValues: {
      type: notification.type,
    },
  });

  const { mutate, isLoading, isSuccess } = useEditNotification();

  const onSubmit: SubmitHandler<EditNotificationSchema> = async (data) => {
    mutate({ id, data });
  };

  return (
    <form
      className="w-full border p-4 rounded-lg shadow-md"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4 py-2">
        {["info", "promo", "alert"].map((type) => (
          <label key={type} className="flex items-center cursor-pointer">
            <input
              checked={watch("type") === type}
              type="radio"
              value={type}
              {...register("type")}
              className="hidden"
            />
            <div className="w-4 h-4 mr-2 border-2 border-primary rounded-md flex items-center justify-center">
              <div className={`w-2 h-2 rounded-md ${watch("type") === type ? "bg-primary" : ""}`}></div>
            </div>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Input defaultValue={notification.title} type="text" {...register("title")} placeholder="Title" />
        {errors.title && <p className="text-xs italic text-red-500">title required</p>}
        <Textarea
          defaultValue={notification.description}
          rows={2}
          {...register("description")}
          placeholder="Description"
        />
        {errors.description && <p className="text-xs italic text-red-500">description required</p>}

        <div className="flex flex-col">
          <label htmlFor="expDate" className="pl-2 text-sm">
            Expiration date
          </label>
          <input
            id="expDate"
            className="py-2 border border-black rounded-md px-2"
            type="datetime-local"
            defaultValue={new Date(notification.expDate).toISOString().slice(0, 16)}
            {...register("expDate", { valueAsDate: true })}
          />
        </div>
        {errors.expDate && <p className="text-xs italic text-red-500">{errors.expDate.message}</p>}
      </div>

      <div className="flex justify-center">
        <Button type="submit" variant={"default"} className="flex gap-2 justify-center rounded-lg pr-2 my-4 w-1/2">
          Submit {isLoading ? <Loader2 height={15} className="animate-spin" /> : isSuccess && <CheckCircle2 />}
        </Button>
      </div>
    </form>
  );
};

export default EditNotificationForm;
