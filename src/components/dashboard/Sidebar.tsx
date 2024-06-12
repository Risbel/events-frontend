import { CatIcon, GalleryVerticalEndIcon, HomeIcon, LockKeyhole, Settings, UsersIcon, VideoIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const menuItems = [
  { id: 1, label: "All Events", icon: GalleryVerticalEndIcon, link: "/dashboard/allevents" },
  { id: 2, label: "Discover", icon: CatIcon, link: "/dashboard/discover" },
  { id: 3, label: "Tutorials", icon: VideoIcon, link: "/dashboard/tutorials" },
  { id: 4, label: "Manage Users", icon: UsersIcon, link: "/dashboard/users" },
  { id: 5, label: "Permissions", icon: LockKeyhole, link: "/dashboard/permissions" },
  { id: 6, label: "Home", icon: HomeIcon, link: "/dashboard" },
];

const SidebarDivider = () => <div className="w-full border-b border-muted my-2 shadow-xl" />;

const Sidebar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="hidden md:flex flex-col relative overflow-hidden h-full z-40 pt-14 md:w-1/3 lg:w-1/5 border-primary/50 border-r">
      {status === "authenticated" ? (
        <div className="p-4 bg-secondary">
          <p>{session.user.name}&apos;s work space</p>
        </div>
      ) : (
        <Skeleton className="h-14 w-full bg-secondary rounded-none" />
      )}

      <div className="flex flex-col gap-2 pt-4">
        {menuItems.map(({ icon: Icon, ...item }) => {
          return (
            <Link
              href={item.link}
              key={item.id}
              className="flex justify-between items-center hover:bg-secondary px-4 py-1"
            >
              <span>{item.label}</span>
              {Icon && <Icon className="stroke-primary h-5 w-5" />}
            </Link>
          );
        })}
      </div>

      <SidebarDivider />

      <div className="flex flex-col gap-2 pt-4">
        <div className="flex justify-between items-center hover:bg-secondary px-4 py-1 cursor-pointer">
          <span>Settings</span>
          <Settings className="stroke-primary h-5 w-5 duration-1000" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
