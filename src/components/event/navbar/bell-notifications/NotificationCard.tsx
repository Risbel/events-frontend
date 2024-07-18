import { cn } from "@/lib/shadcnUtils";
import { ISubscriptionNotifications } from "@/services/getNotificationsByUserEvent";
import { formatDistanceToNow } from "date-fns";
import { Dot } from "lucide-react";
import Image from "next/image";
import SettingsCard from "./SettingsCard";

const NotificationCard = ({ sub }: { sub: ISubscriptionNotifications }) => {
  return (
    <div
      className={cn(
        sub.eventNotification.type === "info"
          ? "shadow-blue-800"
          : sub.eventNotification.type === "promo"
          ? "shadow-purple-500"
          : "shadow-orange-500",
        "rounded-xl shadow-md overflow-hidden relative p-4 flex flex-col items-start bg-white/90 hover:scale-[101%]"
      )}
      key={sub.id}
    >
      {!sub.isRead && <Dot height={40} width={40} className="absolute -top-2 -right-2 stroke-blue-500" />}
      <div className="flex justify-between items-center w-full relative">
        <p className="text-sm text-black border-2 border-black px-2 rounded-xl">{sub.eventNotification.type}</p>

        <SettingsCard sub={sub} />
      </div>

      <div className="flex gap-4 justify-around">
        <div>
          <p className="text-black font-semibold">{sub.eventNotification.title}</p>
          <p className="text-black text-xs line-clamp-2">{sub.eventNotification.description}</p>
          <p className="text-xs font-semibold text-gray-500 pt-2">
            {formatDistanceToNow(new Date(sub.eventNotification.createdAt), { addSuffix: true })}
          </p>
        </div>
        {sub?.eventNotification?.image && (
          <Image
            className="rounded-md"
            alt={sub.eventNotification.title}
            src={sub.eventNotification.image}
            width={120}
            height={80}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
