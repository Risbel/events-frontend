import React, { useState } from "react";
import CircularProgress from "./CircularProgress";

const Progress = () => {
  const [progress, setProgress] = useState(50);

  const handleChange = (e: any) => {
    setProgress(e.target.value);
  };

  return (
    <div className="flex justify-center items-center lg:col-start-9 col-span-12 lg:col-span-4 bg-primary-foreground rounded-xl shadow-md p-4 md:p-6">
      <div className="flex flex-col items-center gap-4">
        <CircularProgress progress={progress} size={300} segments={6} />
      </div>
    </div>
  );
};

export default Progress;
