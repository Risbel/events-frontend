import { useState } from "react";

import AddPermissionForm from "../forms/AddPermissionForm";
import { Button } from "../ui/button";
import { cn } from "@/lib/shadcnUtils";

const AddPermissionButton = ({ roleId }: { roleId: string }) => {
  const [isActiveForm, setIsActiveForm] = useState(false);

  return (
    <div>
      <Button size={"sm"} onClick={() => setIsActiveForm(true)} className={cn(isActiveForm && "hidden")}>
        +
      </Button>

      {isActiveForm && <AddPermissionForm roleId={roleId} setIsActiveForm={setIsActiveForm} />}
    </div>
  );
};

export default AddPermissionButton;
