import { useCreateSubscription } from "@/hooks/useCreateSubscription";
import { Button } from "../ui/button";
import Spinner from "../loaders/Spinner";

const SubscribeButton = ({ userId, discoId }: { userId: string; discoId: string }) => {
  const { subscribe, isLoading } = useCreateSubscription();

  return (
    <Button
      onClick={() => subscribe({ userId, discoId })}
      className="flex items-center gap-2 bg-blue-700 shadow-xl hover:bg-blue-600 px-2 md:px-4"
      size={"lg"}
    >
      <span className="text-md md:text-xl">Subscribe</span>
      {isLoading && <Spinner diameter={4} stroke={"white"} />}
    </Button>
  );
};

export default SubscribeButton;
