import { useDeleteSubscription } from "@/hooks/useDeleteSubscription";
import { Button } from "../../../components/ui/button";
import Spinner from "../../../components/loaders/Spinner";

const Unsubscribe = ({ id }: { id: string }) => {
  const { mutate, isLoading } = useDeleteSubscription();

  return (
    <Button
      size={"sm"}
      onClick={() => mutate(id)}
      className="hover:bg-red-800 hover:text-white flex gap-2"
      variant={"secondary"}
    >
      <span>Unsubscribe</span>
      {isLoading && <Spinner diameter={4} />}
    </Button>
  );
};

export default Unsubscribe;
