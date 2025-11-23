import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function SpendingCircle({ value }: { value: number }) {
  return (
    <div className="w-20 h-20">
      <CircularProgressbar
        value={value}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: "#2563EB",
          trailColor: "#E5E7EB",
          strokeLinecap: "round",
        })}
      />
    </div>
  );
}
