import Link from "next/link";
import { useParams } from "next/navigation";

const Success = () => {
  const params = useParams();

  if (!params?.slug) {
    return;
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col items-center gap-8">
        <span className="text-9xl">🎉</span>

        <h1 className="text-3xl">Purchase completed successfully!</h1>
        <Link className="text-xl text-blue-600 font-bold hover:underline" href={`/event/${params.slug}`}>
          Go back
        </Link>
      </div>
    </div>
  );
};

export default Success;
