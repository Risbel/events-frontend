import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { useDeleteSubscription } from "@/hooks/useDeleteSubscription";
import { CheckCircle2 } from "lucide-react";

const Unsubscribe = ({ id }: { id: string }) => {
  const { mutate, isLoading, isSuccess } = useDeleteSubscription();

  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : isSuccess ? (
    <CheckCircle2 />
  ) : (
    <Button
      size={"sm"}
      onClick={() => mutate(id)}
      className="bg-red-800 hover:bg-red-600 hover:text-white flex gap-2 rounded-lg"
    >
      <span>Unsubscribe</span>
      {isLoading && <Spinner diameter={4} stroke={"white"} />}
    </Button>
  );
};

export default Unsubscribe;
