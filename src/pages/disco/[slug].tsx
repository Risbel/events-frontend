import DiscoEnviroment from "@/components/disco/DiscoEnviroment";
import { useRouter } from "next/router";

const Disco = () => {
  const router = useRouter();

  return <DiscoEnviroment name={router.query.slug} />;
};

export default Disco;
