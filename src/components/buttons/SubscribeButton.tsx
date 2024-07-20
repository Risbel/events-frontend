import { useCreateSubscription } from "@/hooks/useCreateSubscription";
import { Button } from "../ui/button";
import Spinner from "../loaders/Spinner";
import { IDiscoColors } from "@/services/getDisco";
import { CheckCircle2 } from "lucide-react";

const SubscribeButton = ({
  userId,
  discoId,
  discoColors,
}: {
  userId: string;
  discoId: string;
  discoColors: IDiscoColors;
}) => {
  const { mutate, isLoading, isSuccess } = useCreateSubscription();

  return (
    <>
      {isLoading ? (
        <div
          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
          className="rounded-xl p-2"
        >
          <p className="text-md">Loading...</p>
        </div>
      ) : isSuccess ? (
        <CheckCircle2
          className="rounded-full"
          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
        />
      ) : (
        <Button
          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
          onClick={() => mutate({ userId, discoId })}
          className="flex items-center gap-2 shadow-xl hover:opacity-90 rounded-xl"
          size={"default"}
        >
          <span className="text-md">Subscribe</span>
        </Button>
      )}
    </>
  );
};

export default SubscribeButton;
