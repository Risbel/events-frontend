import React from "react";
import { Button } from "../ui/button";

import clsx from "clsx";
import Spinner from "../loaders/Spinner";

const ButtomSubmit = ({ className, isLoading, text }: { className?: string; isLoading: boolean; text: string }) => {
  return (
    <Button
      className={clsx(
        "w-full px-4 py-2 font-medium leading-none text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:shadow-outline",
        className
      )}
      type="submit"
    >
      {isLoading ? <Spinner diameter={4} /> : `${text}`}
    </Button>
  );
};

export default ButtomSubmit;
