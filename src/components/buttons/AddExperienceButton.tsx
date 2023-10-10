import { useState } from "react";
import AddExperiencesForm from "../forms/AddExperiencesForm";
import clsx from "clsx";

const AddExperienceButton = ({ discoDetailId }: { discoDetailId: string }) => {
  const [isActiveForm, setIsActiveForm] = useState(false);

  return (
    <div className="py-4">
      <button
        onClick={() => setIsActiveForm(true)}
        className={clsx(
          "p-4 border-white/50 border-2 rounded-xl text-white/90 text-2xl font-bold bg-white/20 hover:scale-105",
          isActiveForm && "hidden"
        )}
      >
        +
      </button>

      {isActiveForm && <AddExperiencesForm discoDetailId={discoDetailId} setIsActiveForm={setIsActiveForm} />}
    </div>
  );
};

export default AddExperienceButton;
