import { AddDiscoSchema } from "./AddDiscos";
import React, { ChangeEvent, useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";

const ColorPicker = ({
  register,
  defaultColor,
  defaultValue,
  id,
  reset,
}: {
  register: any;
  defaultColor?: string;
  defaultValue?: string;
  id: string;
  reset?: UseFormReset<AddDiscoSchema>;
}) => {
  const [color, setColor] = useState<any>(defaultColor);
  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    reset &&
      reset((prev) => ({
        ...prev,
        [id]: e.target.value,
      }));
  };

  return (
    <div className="flex flex-col gap-2 bg-secondary p-2 rounded-xl">
      <div className="relative group">
        <input
          id={id}
          {...register(id)}
          defaultValue={defaultValue}
          onChange={handleColorChange}
          type="color"
          className="opacity-0 absolute z-10 h-full w-full cursor-pointer"
        />
        <div>
          <div style={{ backgroundColor: color }} className="absolute w-full h-full rounded-xl" />
          <div
            style={{ backgroundColor: color }}
            className="h-6 w-full group-hover:blur-sm transition-all opacity-50 rounded-xl"
          />
        </div>
      </div>
      <input
        id={id}
        onChange={handleColorChange}
        value={color}
        className="rlative z-20 text-primary text-center text-sm w-full border py-2 rounded-xl hover:bg-secondary transition-colors hover:border-black hover:text-primary"
      />
    </div>
  );
};

export default ColorPicker;
