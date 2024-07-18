import { useGetNotificationsByUserEvent } from "@/hooks/useGetNotificationsByUserEvent";
import NotificationCard from "./NotificationCard";
import { Skeleton } from "@/components/ui/skeleton";

const Notifications = ({ userId, eventId }: { userId: string; eventId: string }) => {
  const { data, isLoading } = useGetNotificationsByUserEvent(userId, eventId);

  if (isLoading) {
    return (
      <div className="flex flex-col p-4 gap-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {!data?.subscriptionNotifications?.length && (
        <div className="bg-white p-4 rounded-xl">
          <p className="text-black text-center">Nothing to show</p>
        </div>
      )}
      {data?.subscriptionNotifications.map((sub) => {
        return <NotificationCard key={sub.id} sub={sub} />;
      })}
    </div>
  );
};

export default Notifications;
