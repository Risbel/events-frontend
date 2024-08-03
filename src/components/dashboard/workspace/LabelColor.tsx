import React from "react";

const LabelColor = ({ text, htmlFor }: { text: string; htmlFor: string }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="px-0 left-0 block mb-1 text-xs md:text-sm font-medium text-primary w-min text-nowrap pl-2 md:pl-4"
    >
      {text}
    </label>
  );
};

export default LabelColor;
