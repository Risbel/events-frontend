import React, { useState } from "react";
import CircularProgress from "./CircularProgress";

const Progress = () => {
  const [progress, setProgress] = useState(50);

  const handleChange = (e: any) => {
    setProgress(e.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <CircularProgress progress={progress} size={300} segments={6} />
      <input type="range" min="0" max="100" value={progress} onChange={handleChange} />
    </div>
  );
};

export default Progress;
