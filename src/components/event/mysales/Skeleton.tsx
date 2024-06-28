const Skeleton = ({ divCount = 12 }: { divCount?: number }) => {
  const divsArray = Array.from({ length: divCount }, (_, index) => (
    <div key={index} className="h-48 min-w-80 rounded-xl bg-secondary animate-pulse"></div>
  ));

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="h-10 w-80 bg-secondary animate-pulse rounded-lg"></div>
      <div className="flex justify-center flex-wrap gap-6">{divsArray}</div>
    </div>
  );
};

export default Skeleton;
