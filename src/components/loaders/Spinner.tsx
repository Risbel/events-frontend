import { cn } from "@/lib/shadcnUtils";
import { Loader2Icon } from "lucide-react";

const Spinner = ({ diameter, stroke }: { diameter: number; stroke: string }) => {
  return <Loader2Icon stroke={`${stroke}`} className={cn("animate-spin", `h-${diameter} w-${diameter}`)} />;
};

export default Spinner;
