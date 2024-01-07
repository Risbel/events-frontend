import Image from "next/image";
import React from "react";

interface AuxProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuxProps) => {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-current">
      <Image
        priority
        className="blur-sm w-screen hidden md:block"
        src={"/home-image-robotic-hand.jpg"}
        height={768}
        width={1024}
        alt="home image robotic hand"
      />
      <Image
        priority
        className="blur-sm w-screen md:hidden"
        src={"/home-image-robotic-hand-movile.jpg"}
        height={667}
        width={375}
        alt="home image robotic hand movile"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between text-center md:justify-around absolute rounded-xl md:rounded-3xl shadow-md shadow-black/10 px-4 py-4 md:py-12 w-full md:w-5/6 lg:w-8/12 bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
