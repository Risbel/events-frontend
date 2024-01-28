import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { useDeleteBankCard } from "@/hooks/useDeleteBankCard";
import { IUserBankCardByUserId } from "@/services/getUserBankCardsByUserId";
import React from "react";

const CardItem = ({ bankCard }: { bankCard: IUserBankCardByUserId }) => {
  const { mutate, isLoading: isLoadingDelete } = useDeleteBankCard();
  if (!bankCard) {
    return;
  }

  return (
    <div className="flex flex-col items-center bg-white/80 p-4 rounded-md" key={bankCard.id}>
      <p className="text-black text-sm md:text-md">{bankCard.name} </p>
      <p className="text-black text-xl md:text-2xl">{bankCard.number}</p>
      {bankCard.discoDetails.length < 1 ? (
        <div className="flex justify-end w-full pt-4">
          <Button
            onClick={() => mutate(bankCard.id)}
            className="flex items-center gap-2 h-6 px-2 bg-red-700 hover:bg-red-600 "
          >
            <span>delete</span> {isLoadingDelete && <Spinner diameter={3} stroke={"white"} />}
          </Button>
        </div>
      ) : (
        <div className="p-2 rounded-md bg-secondary border border-l-2 border-b-2 border-black mt-4">
          <p className="text-xs text-center font-semibold">Bank card associated, you can{`'`}t delete it.</p>
        </div>
      )}
    </div>
  );
};

export default CardItem;
