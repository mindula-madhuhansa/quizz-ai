import { roundNumber } from "@/lib/utils";

type Props = {
  value: number | string | null;
  label: string;
};

export const MetricCard = ({ value, label }: Props) => {
  return (
    <div className="p-6 border rounded-md">
      <p className="text-[#6c7381]">{label}</p>
      <p className="text-3xl font-bold mt-2">{roundNumber(value)}</p>
    </div>
  );
};
