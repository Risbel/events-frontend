import DiscoEnviroment from "@/components/disco/DiscoEnviroment";
import { useRouter } from "next/router";

const Disco = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  if (slug) {
    return <DiscoEnviroment slug={slug} />;
  }
};

export default Disco;
