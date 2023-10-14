import TargetDisco from "@/components/home/TargetDisco";
import HomeLayout from "@/components/layouts/HomeLayout";
import Spinner from "@/components/loaders/Spinner";

import { useGetDiscos } from "@/hooks/useGetDiscos";

const Home = () => {
  const { data, isLoading, isFetched, isError } = useGetDiscos();

  return (
    <HomeLayout>
      <main className="flex flex-col items-center h-screen pt-24">
        <div className="grid lg:grid-cols-2 gap-4">
          {isLoading && <Spinner diameter={10} />}

          {isFetched && data && data?.map((disco) => <TargetDisco key={disco.id} disco={disco} />)}
          {isError && <span className="text-white">Error conection o: please try later \: </span>}
        </div>
      </main>
    </HomeLayout>
  );
};

export default Home;
