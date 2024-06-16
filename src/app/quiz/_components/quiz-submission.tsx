import Image from "next/image";
import { useEffect } from "react";
import { useReward } from "react-rewards";

import { Bar } from "@/components/bar";

type Props = {
  scorePercentage: number;
  score: number;
  totalQuestions: number;
};

export const QuizSubmission = ({
  score,
  totalQuestions,
  scorePercentage,
}: Props) => {
  const { reward } = useReward("rewardId", "confetti");

  useEffect(() => {
    if (scorePercentage === 100) {
      reward();
    }
  }, [scorePercentage, reward]);

  return (
    <div className="flex flex-col flex-1">
      <main className="py-11 flex flex-col gap-4 items-center flex-1 mt-24">
        <h2 className="text-3xl font-bold">Quiz Complete! 🎊</h2>
        <p>You scored: {scorePercentage}%</p>

        {scorePercentage === 100 && (
          <div className="flex flex-col items-center">
            <p>Congratulations! You got a perfect score! 🎉</p>
            <div className="flex justify-center ">
              <Image
                src="/images/owl-smiling.png"
                alt="Owl Smiling"
                width={300}
                height={300}
              />
            </div>
            <span id="rewardId" />
          </div>
        )}

        <>
          <div className="flex flex-row gap-8 mt-6">
            <Bar
              percentage={scorePercentage}
              color="green"
            />
            <Bar
              percentage={100 - scorePercentage}
              color="rose"
            />
          </div>
          <div className="flex flex-row gap-8">
            <p>{score} Correct</p>
            <p>{totalQuestions - score} Incorrect</p>
          </div>
        </>
      </main>
    </div>
  );
};
