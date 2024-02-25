import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { useDeleteSubscription } from "@/hooks/useDeleteSubscription";

const Unsubscribe = ({ id }: { id: string }) => {
  const { mutate, isLoading } = useDeleteSubscription();

  return (
    <Button
      size={"sm"}
      onClick={() => mutate(id)}
      className="hover:bg-red-800 hover:text-white flex gap-2 rounded-lg"
      variant={"secondary"}
    >
      <span>Unsubscribe</span>
      {isLoading && <Spinner diameter={4} stroke={"white"} />}
    </Button>
  );
};

export default Unsubscribe;
