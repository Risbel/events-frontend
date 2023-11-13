import { useState } from "react";

import clsx from "clsx";
import { Button } from "../ui/button";
import AddTicketsForm from "../forms/AddTicketsForm";

const AddTicketsButton = ({ discoId }: { discoId: string }) => {
  const [isActiveForm, setIsActiveForm] = useState(false);

  return (
    <div>
      <Button size={"sm"} onClick={() => setIsActiveForm(true)} className={clsx(isActiveForm && "hidden")}>
        Add Tickets
      </Button>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 col-start-2 w-full">
        {isActiveForm && <AddTicketsForm discoId={discoId} setIsActiveForm={setIsActiveForm} />}
      </div>
    </div>
  );
};

export default AddTicketsButton;
