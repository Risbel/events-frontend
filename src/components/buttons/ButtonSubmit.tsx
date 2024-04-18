import React from "react";
import { Button } from "../ui/button";
import Spinner from "../loaders/Spinner";
import { cn } from "@/lib/shadcnUtils";
import { CheckCircleIcon } from "lucide-react";

const ButtonSubmit = ({
  className,
  isLoading,
  isSuccess,
  isError,
  status,
  text,
}: {
  className?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  status?: number | string;
  text: string;
}) => {
  return (
    <div className="relative">
      {isSuccess && (
        <div className="flex gap-4 justify-center items-center bg-muted rounded-md absolute w-full h-full">
          Done! <CheckCircleIcon stroke="green" />
        </div>
      )}

      {isError && (
        <div className="flex gap-4 justify-center items-center bg-muted rounded-md absolute w-full h-full">
          <span className="text-red-700">Ops! There was an error</span> 😥
        </div>
      )}

      <Button className={cn(className, "w-full")} type="submit">
        {isLoading ? (
          <span>
            Please wait a minute while we deploy your site <Spinner diameter={4} stroke={"white"} />
          </span>
        ) : (
          `${text}`
        )}
      </Button>
    </div>
  );
};

export default ButtonSubmit;
