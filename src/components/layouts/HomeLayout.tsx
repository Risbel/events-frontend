import Image from "next/image";
import Navbar from "../navigation/Navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen h-screen bg-neutral-900">
      <Navbar />
      <div className="w-full h-full absolute z-20 backdrop-blur-3xl overflow-y-scroll">{children}</div>
      <div className="fixed right-20 top-1/3">
        <Image
          src="/blob.svg"
          width={400}
          height={400}
          alt="Picture of the author"
          placeholder="blur"
          blurDataURL={"/blob.svg"}
        />
      </div>
      <div className="fixed">
        <Image
          src="/blob2.svg"
          width={400}
          height={400}
          alt="Picture of the author"
          placeholder="blur"
          blurDataURL={"/blob2.svg"}
        />
      </div>
      <div className="fixed right-0">
        <Image
          src="/blob3.svg"
          width={400}
          height={400}
          alt="Picture of the author"
          placeholder="blur"
          blurDataURL={"/blob3.svg"}
        />
      </div>
    </div>
  );
}
