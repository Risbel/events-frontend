import { cn } from "@/lib/shadcnUtils";
import { Ticket } from "lucide-react";

const CircularProgress = ({ size, progress, segments }: { size: number; progress: number; segments: number }) => {
  const strokeWidth = 30;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const segmentAngle = 360 / segments;
  const circles = Array.from({ length: segments }, (_, i) => {
    const angle = segmentAngle * i - 90; // Offset by -90 to start from the top
    const x = center + radius * Math.cos((angle * Math.PI) / 180);
    const y = center + radius * Math.sin((angle * Math.PI) / 180);
    const filled = progress >= (100 / segments) * i;
    return { x, y, filled };
  });

  return (
    <svg width={size} height={size}>
      <circle stroke="#e6e6e6" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={center} cy={center} />
      <circle
        id="circle"
        stroke="#3b5998"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={center}
        cy={center}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      {circles.map((circle, index) => (
        <g key={index} className="relative">
          <circle
            cx={circle.x}
            cy={circle.y}
            r={25}
            fill={circle.filled ? "#3b5998" : "#e6e6e6"}
            className="drop-shadow-md"
          />
          <Ticket
            className={cn(circle.filled ? "stroke-[#ffffff]" : "stroke-primary")}
            x={circle.x - 12.5}
            y={circle.y - 12.5}
            width={25}
            height={25}
          />
        </g>
      ))}
      <text x={center} y={center - 20} textAnchor="middle" fontSize="20" fontWeight={600} fill="#41444b">
        Event
      </text>
      <text x={center} y={center + 20} textAnchor="middle" fontSize="30" fontWeight={600} fill="#41444b">
        {progress}%
      </text>
    </svg>
  );
};

export default CircularProgress;
