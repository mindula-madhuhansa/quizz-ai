import { cn } from "@/lib/utils";

type Props = {
  percentage: number;
  color: string;
};

export const Bar = ({ percentage, color }: Props) => {
  const barStyle = {
    height: `${percentage}%`,
  };

  const barBgClasses: Record<string, string> = {
    green: "bg-green-500",
    rose: "bg-rose-500",
    blue: "bg-blue-500",
  };
  return (
    <div className="h-40 flex items-end justify-end">
      <div
        className={cn(
          barBgClasses[color],
          "w-14 rounded-xl border-2 border-black"
        )}
        style={barStyle}
      ></div>
    </div>
  );
};
