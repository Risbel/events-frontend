import clsx from "clsx";
import React from "react";
import Spinner from "../loaders/Spinner";
import { Button } from "../ui/button";
import { useDeleteTicket } from "@/hooks/useDeleteTicket";

const DeleteTicketButton = ({ id }: { id: string }) => {
  const { isLoading, mutate } = useDeleteTicket();

  return (
    <div>
      <Button
        onClick={() => {
          mutate(id);
        }}
        className={clsx("flex items-center gap-2 bg-red-800 hover:bg-red-700")}
      >
        Delete
        {isLoading && <Spinner diameter={3} stroke={"white"} />}
      </Button>
    </div>
  );
};

export default DeleteTicketButton;
