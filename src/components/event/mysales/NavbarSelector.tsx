import { cn } from "@/lib/shadcnUtils";
import Link from "next/link";
import { useParams } from "next/navigation";

export const NavbarSelector = () => {
  const params = useParams();
  const selectors = ["today", "yesterday", "pending", "expired"];

  return (
    <div className="flex gap-2 justify-center my-4">
      {selectors.map((selector) => {
        return (
          <Link
            className={cn(
              "border px-2 py-1 rounded-md",
              params?.selector == selector ? "bg-primary text-white" : "hover:bg-secondary"
            )}
            href={`/event/${params?.slug}/my-sales/${selector}`}
            key={selector}
          >
            {selector}
          </Link>
        );
      })}
    </div>
  );
};
