import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const Cancel = () => {
  const param = useParams();

  if (!param?.slug) {
    return;
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col items-center gap-8">
        <span className="text-9xl">✖️</span>

        <h1 className="text-3xl">Purchase Canceled 🥹</h1>
        <Link className="text-xl text-blue-600 font-bold hover:underline" href={`/event/${param?.slug}`}>
          Go back
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
