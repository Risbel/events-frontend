import { Skeleton } from "../ui/skeleton";

export const SkeletonHead = () => {
  return (
    <div>
      <div className="flex items-center gap-4 md:gap-8 pb-8">
        <Skeleton className="h-20 w-20 md:h-40 md:w-40 rounded-full" />
        <Skeleton className="h-8 w-32 md:h-14 md:w-80" />
      </div>
      <div className="flex flex-col gap-2 pr-8">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};

export const SkeletonAboutUs = () => {
  return (
    <div className="pt-12">
      <Skeleton className="h-10 w-60" />
      <div className="flex flex-col gap-2 pt-4 pr-4 md:pr-8">
        <Skeleton className="h-3 md:h-4 w-full" />
        <Skeleton className="h-3 md:h-4 w-full" />
        <Skeleton className="h-3 md:h-4 w-full" />
        <Skeleton className="h-3 md:h-4 w-full" />
      </div>
    </div>
  );
};

export const SkeletonExperiences = () => {
  return (
    <div className="flex flex-col gap-4 pt-12 pb-12">
      <Skeleton className="h-10 w-60" />
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-5 gap-8">
        <Skeleton className="overflow-hidden h-72 w-full rounded-2xl" />
        <Skeleton className="overflow-hidden h-72 w-full rounded-2xl" />
        <Skeleton className="overflow-hidden h-72 w-full rounded-2xl" />
        <Skeleton className="overflow-hidden h-72 w-full rounded-2xl" />
        <Skeleton className="overflow-hidden h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
};
