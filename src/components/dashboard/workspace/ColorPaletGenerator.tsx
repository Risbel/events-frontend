import { Button } from "@/components/ui/button";

const ColorPaletteGenerator = () => {
  return (
    <div className="flex flex-col justify-between w-1/3 px-6 pt-6 pb-10 bg-white rounded-md shadow-md">
      <h2 className="text-xl text-primary text-center font-bold mb-4">Color Palette Generator</h2>

      <div className="flex flex-col gap-3 items-center justify-between mb-6">
        <div className="flex gap-2 items-center w-full">
          <div className="w-2/3 h-6 bg-gray-500 rounded-full"></div>
          <div className="text-center w-1/3 rounded-full border cursor-pointer group hover:bg-primary">
            <span className="text-sm text-gray-700 group-hover:text-primary-foreground">#808080</span>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full">
          <div className="w-2/3 h-6 bg-gray-400 rounded-full"></div>
          <div className="text-center w-1/3 rounded-full border cursor-pointer group hover:bg-primary">
            <span className="text-sm text-gray-700 group-hover:text-primary-foreground">#666666</span>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full">
          <div className="w-2/3 h-6 bg-gray-300 rounded-full"></div>
          <div className="text-center w-1/3 rounded-full border cursor-pointer group hover:bg-primary">
            <span className="text-sm text-gray-700 group-hover:text-primary-foreground">#4d4d4d</span>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full">
          <div className="w-2/3 h-6 bg-gray-200 rounded-full"></div>
          <div className="text-center w-1/3 rounded-full border cursor-pointer group hover:bg-primary">
            <span className="text-sm text-gray-700 group-hover:text-primary-foreground">#333333</span>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full">
          <div className="w-2/3 h-6 bg-gray-100 rounded-full"></div>
          <div className="text-center w-1/3 rounded-full border cursor-pointer group hover:bg-primary">
            <span className="text-sm text-gray-700 group-hover:text-primary-foreground">#1a1a1a</span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <Button type="button">Generate palette</Button>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
