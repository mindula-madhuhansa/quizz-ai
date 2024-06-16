import { cn } from "@/lib/utils";

type Props = {
  isCorrect: boolean | null;
  correctAnswer: string;
};

export const ResultCard = ({ isCorrect, correctAnswer }: Props) => {
  if (isCorrect === null) return null;

  const result = isCorrect
    ? "Correct!"
    : `Incorrect! The correct answer is ${correctAnswer}`;

  const borderClasses = isCorrect ? "border-green-500" : "border-rose-500";

  return (
    <div
      className={cn(
        "border-2 rounded-lg p-4 text-center text-lg font-semibold bg-secondary my-4",
        isCorrect ? "border-green-500" : "border-rose-500"
      )}
    >
      {result}
    </div>
  );
};
