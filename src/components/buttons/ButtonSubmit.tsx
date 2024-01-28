import React from "react";
import { Button } from "../ui/button";
import Spinner from "../loaders/Spinner";
import { cn } from "@/lib/shadcnUtils";

const ButtonSubmit = ({ className, isLoading, text }: { className?: string; isLoading: boolean; text: string }) => {
  return (
    <Button className={cn(className, "w-full")} type="submit">
      {isLoading ? <Spinner diameter={4} stroke={"white"} /> : `${text}`}
    </Button>
  );
};

export default ButtonSubmit;
