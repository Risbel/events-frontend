import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateBankCard } from "@/hooks/useCreateBankCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const addNewCardSchema = z.object({
  number: z.string().min(19, { message: "This field must have at least 16 numbers." }),
  name: z.string().min(1, { message: "Please, fill this input." }),
  userId: z.string().min(1),
});

export type AddNewCardSchema = z.infer<typeof addNewCardSchema>;

const AddNewCard = () => {
  const [cardValue, setCardValue] = useState("");
  const { data } = useSession();

  const { mutate, isLoading } = useCreateBankCard();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddNewCardSchema>({ resolver: zodResolver(addNewCardSchema) });

  const onSubmit: SubmitHandler<AddNewCardSchema> = (data) => {
    data.number = data.number.replace(/-/g, "");

    mutate(data);
    reset();
    setCardValue("");
  };

  return (
    <div className="absolute p-2 border rounded-md bg-blue-500/10">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-xs text-white pl-1" htmlFor="number">
            Add number card here
          </label>
          <Input
            value={cardValue}
            maxLength={19}
            placeholder="Bank card number"
            autoComplete="off"
            className="pl-2 rounded-md h-8 outline-none font-semibold"
            {...register("number")}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              value = value.replace(/(\d{4})(?=\d)/g, "$1-");
              if (value.length >= 20) {
                return;
              }
              setCardValue(value);
            }}
            id="number"
            type="text"
          />
          {errors.number && <p className="text-xs italic text-red-500 mt-2">{errors.number?.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-white pl-1" htmlFor="number">
            Short description
          </label>
          <textarea
            maxLength={25}
            placeholder="Short description"
            autoComplete="off"
            className="pl-2 rounded-md h-8 outline-none text-sm"
            {...register("name")}
            id="name"
          />
          {errors.name && <p className="text-xs italic text-red-500 mt-2">{errors.name?.message}</p>}
        </div>
        <input id="userId" hidden type="text" defaultValue={data?.user.id} {...register("userId")} />
        <div className="flex justify-end">
          <Button className="flex items-center gap-2 text-xs h-8 px-2" type="submit">
            Add card {isLoading && <Spinner diameter={4} />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCard;
