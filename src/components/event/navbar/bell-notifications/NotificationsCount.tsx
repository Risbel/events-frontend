import { useGetNotificationsCount } from "@/hooks/useGetNotificationsCount";

const NotificationsCount = ({ userId, eventId }: { userId: string; eventId: string }) => {
  const { data } = useGetNotificationsCount(userId, eventId);

  if (!data || data.count == 0) {
    return;
  }

  return (
    <div className="absolute z-20 flex justify-center items-center rounded-full bg-red-700 border border-white -right-2 -top-2 h-5 w-5">
      <span className="text-xs font-semibold text-white">{data.count}</span>
    </div>
  );
};

export default NotificationsCount;
