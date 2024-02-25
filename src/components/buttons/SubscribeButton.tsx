import { useCreateSubscription } from "@/hooks/useCreateSubscription";
import { Button } from "../ui/button";
import Spinner from "../loaders/Spinner";
import { IDiscoColors } from "@/services/getDisco";

const SubscribeButton = ({
  userId,
  discoId,
  discoColors,
}: {
  userId: string;
  discoId: string;
  discoColors: IDiscoColors;
}) => {
  const { subscribe, isLoading } = useCreateSubscription();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg" style={{ color: discoColors.navbarForeground }}>
        Subscribe you here
      </p>
      <Button
        style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
        onClick={() => subscribe({ userId, discoId })}
        className="flex items-center gap-2 shadow-xl hover:opacity-90 rounded-xl"
        size={"lg"}
      >
        <span className="text-md md:text-xl">Subscribe</span>
        {isLoading && <Spinner diameter={4} stroke={discoColors.bgNavbarColor} />}
      </Button>
    </div>
  );
};

export default SubscribeButton;
