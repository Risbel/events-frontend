import React, { ChangeEvent, useState } from "react";

const ColorPicker = ({ register, defaultColor, id }: { register: any; defaultColor?: string; id: string }) => {
  const [color, setColor] = useState<any>(defaultColor);
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 bg-secondary p-2 rounded-xl">
      <div className="relative group">
        <input
          id={id}
          {...register(id)}
          value={color}
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
        onChange={handleColorChange}
        value={color}
        className="rlative z-20 text-primary text-center text-sm w-full border py-2 rounded-xl hover:bg-secondary transition-colors hover:border-black hover:text-primary"
      />
    </div>
  );
};

export default ColorPicker;
