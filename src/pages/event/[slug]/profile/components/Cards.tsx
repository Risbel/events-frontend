import { Button } from "@/components/ui/button";
import { useGetBankCardsByUserId } from "@/hooks/useGetBankCardsByUserId";
import FormAddNewCard from "./FormAddNewCard";
import { useState } from "react";
import { cn } from "@/lib/shadcnUtils";
import CardItem from "./CardItem";
import { IDiscoColors } from "@/services/getDisco";

const Cards = ({ userId, discoColors }: { userId: string; discoColors: IDiscoColors }) => {
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const { data, isLoading } = useGetBankCardsByUserId(userId);

  return (
    <div
      style={{ background: `${discoColors?.bgNavbarColor}90` }}
      className="py-4 md:py-10 px-4 md:px-12 mx-2 md:mx-8 rounded-3xl shadow-md"
    >
      <h2 style={{ color: `${discoColors?.navbarForeground}` }} className="text-white text-xl font-semibold pb-4">
        My bank cards:
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:justify-start">
        {data && data?.map((bankCard) => <CardItem discoColors={discoColors} key={bankCard.id} bankCard={bankCard} />)}
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
