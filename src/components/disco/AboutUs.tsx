import React from "react";

const AboutUs = ({ largeDescription }: { largeDescription: string }) => {
  return (
    <div>
      <h1 className="font-extrabold text-4xl text-white mt-5 text-center md:text-start">About us</h1>
      <p className="text-white text-md md:text-lg font-light text-start">{largeDescription}</p>
    </div>
  );
};

export default AboutUs;
