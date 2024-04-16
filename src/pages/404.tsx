import { Button } from "@/components/ui/button";
import Link from "next/link";

function Error() {
  return (
    <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
      <span className="text-white text-8xl font-semibold">404</span>
      <div className="flex flex-col gap-2">
        <span className="text-white text-xl">
          <span>Page not found</span>
        </span>
      </div>
    </div>
  );
}

export default Error;
