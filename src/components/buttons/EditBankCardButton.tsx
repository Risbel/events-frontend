import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/shadcnUtils";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserBankCard } from "@/services/getDisco";
import { useGetBankCardsByUserId } from "@/hooks/useGetBankCardsByUserId";
import { useUpdateDiscoBankCard } from "@/hooks/useUpdateDiscoBankCardAsociated";
import Spinner from "../loaders/Spinner";

const editBankCardSchema = z.object({
  userBankCardId: z.string().min(1, { message: "You must have select first a number card" }),
});

export type EditBankCardSchema = z.infer<typeof editBankCardSchema>;

const EditBankCardButton = ({ discoBankCard }: { discoBankCard: IUserBankCard }) => {
  const [isActive, setIsActive] = useState(false);
  const { data, isLoading: isLoadingCards } = useGetBankCardsByUserId(discoBankCard.userId);
  const { mutate, isLoading } = useUpdateDiscoBankCard();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBankCardSchema>({ resolver: zodResolver(editBankCardSchema) });

  const onSubmit: SubmitHandler<EditBankCardSchema> = (data) => {
    mutate(data);
  };

  if (isLoadingCards) {
    return (
      <div className="flex w-full justify-center py-4">
        <Spinner diameter={4} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {data && data.length === 1 ? (
        <div className="p-2 rounded-md bg-white/80">
          <p>If want to change this card first add a new card to your personal acount.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              className={cn(isActive && "bg-yellow-600 hover:bg-yellow-500")}
              onClick={() => setIsActive((prev) => !prev)}
            >
              {isActive ? "Discart" : "Change card"}
            </Button>
          </div>
          <div>
            {isActive && (
              <div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <select className="py-2 pl-2  rounded-sm" id="userBankCardId" {...register("userBankCardId")}>
                      <option className="py-2" value="" hidden>
                        Select new card here
                      </option>
                      {data &&
                        data?.map(
                          (item) =>
                            discoBankCard.id !== item.id && (
                              <option className="py-2" key={item.id} value={item.id}>
                                {item.number.replace(/(\d{4})/g, "$1-").slice(0, -1)}
                              </option>
                            )
                        )}
                    </select>
                    {errors.userBankCardId && (
                      <p className="text-xs italic text-red-500 mt-2">{errors.userBankCardId.message}</p>
                    )}
                  </div>
                  <Button type="submit">
                    <div className="flex gap-2 items-center">
                      <span>Add new card</span> {isLoading && <Spinner diameter={4} />}
                    </div>
                  </Button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EditBankCardButton;
