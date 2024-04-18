import Image from "next/image";
import React from "react";

interface AuxProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuxProps) => {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      <div className="absolute -z-20 h-80 w-80 bg-primary-foreground blur-3xl right-32"></div>
      <div className="absolute inset-0 -z-30 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between text-center md:justify-around absolute rounded-xl md:rounded-3xl shadow-md shadow-black/10 px-4 py-4 md:py-12 w-full md:w-5/6 lg:w-8/12 bg-secondary">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
