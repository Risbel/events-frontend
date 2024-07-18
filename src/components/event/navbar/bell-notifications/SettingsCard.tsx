import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import DeleteNotification from "./DeleteNotification";
import { ISubscriptionNotifications } from "@/services/getNotificationsByUserEvent";
import MarkAsRead from "./MarkAsRead";

const SettingsCard = ({ sub }: { sub: ISubscriptionNotifications }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu height={20} width={20} stroke="black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-translate-x-12 bg-white/90 backdrop-blur-2xl">
        <DropdownMenuItem className="flex gap-2 focus:bg-primary">
          <MarkAsRead sub={sub} />
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-primary">
          <DeleteNotification notificationId={sub.eventNotificationId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsCard;
