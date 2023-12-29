import TargetDisco from "@/components/home/TargetDisco";
import HomeLayout from "@/components/layouts/HomeLayout";
import Spinner from "@/components/loaders/Spinner";

import { useGetDiscos } from "@/hooks/useGetDiscos";

const Home = () => {
  const { data, isLoading, isFetched, isError } = useGetDiscos();

  if (isLoading) {
    return (
      <HomeLayout>
        <div className="flex justify-center pt-20">
          <Spinner diameter={8} />
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <main className="flex flex-col md:items-center h-screen pt-24 px-4 md:px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {!isError && isFetched && data && data?.map((disco) => <TargetDisco key={disco.id} disco={disco} />)}
        </div>
        {isError && <span className="text-white px-2">Error conection o: please try later \: </span>}
      </main>
    </HomeLayout>
  );
};

export default Home;
