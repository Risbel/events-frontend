import { useDeleteExperience } from "@/hooks/useDeleteExperience";
import { Button } from "../ui/button";
import Spinner from "../loaders/Spinner";

const DeleteExperienceButton = ({ id }: { id: string }) => {
  const { mutate, isLoading } = useDeleteExperience();

  return (
    <div className="flex w-full justify-end">
      <Button variant={"destructive"} onClick={() => mutate(id)}>
        <div className="flex gap-2">
          {isLoading && <Spinner diameter={6} />}
          <p>Delete</p>
        </div>
      </Button>
    </div>
  );
};

export default DeleteExperienceButton;
