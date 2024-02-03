import { Button } from "@/components/ui/button";
import { useGetBankCardsByUserId } from "@/hooks/useGetBankCardsByUserId";
import FormAddNewCard from "./FormAddNewCard";
import { useState } from "react";
import { cn } from "@/lib/shadcnUtils";
import CardItem from "./CardItem";

const Cards = ({ userId }: { userId: string }) => {
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const { data, isLoading } = useGetBankCardsByUserId(userId);

  return (
    <div className="px-4 md:px-12 pb-56">
      <h2 className="text-white text-xl font-semibold pb-4">My bank cards:</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:justify-start">
        {data && data?.map((bankCard) => <CardItem key={bankCard.id} bankCard={bankCard} />)}
        <div>
          <Button
            className={cn(
              isAddCardOpen && "bg-muted hover:bg-muted/90 text-accent",
              "h-8 mb-1 bg-secondary text-foreground hover:bg-muted"
            )}
            onClick={() => setIsAddCardOpen((prev) => !prev)}
          >
            {isAddCardOpen ? "Discard" : "Add card"}
          </Button>
          {isAddCardOpen && <FormAddNewCard />}
        </div>
      </div>
    </div>
  );
};

export default Cards;
