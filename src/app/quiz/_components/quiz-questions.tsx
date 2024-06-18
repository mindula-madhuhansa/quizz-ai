"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { ChevronLeftIcon, XIcon } from "lucide-react";

import {
  questionAnswers,
  questions as dbQuestions,
  quizzes,
} from "@/db/schema";
import { saveSubmission } from "@/actions/saveSubmissions";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResultCard } from "../_components/result-card";
import { QuizSubmission } from "../_components/quiz-submission";
import Image from "next/image";

type Answer = InferSelectModel<typeof questionAnswers>;
type Question = InferSelectModel<typeof dbQuestions> & { answers: Answer[] };
type Quizz = InferSelectModel<typeof quizzes> & { questions: Question[] };

type Props = {
  quizz: Quizz;
};

export const QuizQuestions = (props: Props) => {
  const { questions } = props.quizz;
  const router = useRouter();

  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<
    {
      questionId: Number;
      answerId: number;
    }[]
  >([]);

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleAnswer = (answer: Answer, questionId: number) => {
    const newUserAnswersArr = [
      ...userAnswers,
      {
        answerId: answer.id,
        questionId,
      },
    ];
    setUserAnswers(newUserAnswersArr);

    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
    }

    const currentPercentage = ((currentQuestion + 1) / questions.length) * 100;
    setPercentage(currentPercentage);
  };

  const handleSubmit = async () => {
    try {
      const subId = await saveSubmission({ score }, props.quizz.id);
    } catch (error) {
      console.error(error);
    }

    setSubmitted(true);
  };

  const handlePressPrevious = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion((prevCurrQuestion) => prevCurrQuestion - 1);
    }
  };

  const handleExit = () => {
    router.push("/dashboard");
  };

  const scorePercentage: number = Math.round((score / questions.length) * 100);
  const selectedAnswer: number | null | undefined = userAnswers.find(
    (item) => item.questionId === questions[currentQuestion].id
  )?.answerId;
  const isCorrect: boolean | null | undefined = questions[
    currentQuestion
  ].answers.findIndex((answer) => answer.id === selectedAnswer)
    ? questions[currentQuestion].answers.find(
        (answer) => answer.id === selectedAnswer
      )?.isCorrect
    : null;

  if (submitted) {
    return (
      <QuizSubmission
        score={score}
        scorePercentage={scorePercentage}
        totalQuestions={questions.length}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="sticky top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={handlePressPrevious}
          >
            <ChevronLeftIcon />
          </Button>

          <Progress value={percentage} />

          <Button
            size="icon"
            variant="outline"
            onClick={handleExit}
          >
            <XIcon />
          </Button>
        </header>
      </div>

      <main className="flex justify-center flex-1">
        {!started ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold">Welcome to Quiz Page👋</h1>
            <Image
              src="/images/owl-start-quiz.png"
              width="400"
              height="400"
              alt="owl"
              className="object-contain ml-12"
            />
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-center">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {questions[currentQuestion].answers.map((answer) => {
                const variant =
                  selectedAnswer === answer.id
                    ? answer.isCorrect
                      ? "neoSuccess"
                      : "neoDanger"
                    : "neoOutline";
                return (
                  <Button
                    variant={variant}
                    size="xl"
                    key={answer.id}
                    disabled={!!selectedAnswer}
                    onClick={() =>
                      handleAnswer(answer, questions[currentQuestion].id)
                    }
                  >
                    <p
                      className="whitespace-normal 
                    text-sm md:text-base
                  "
                    >
                      {answer.answerText}
                    </p>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="footer pb-9 px-6 relative mb-0">
        <ResultCard
          isCorrect={isCorrect}
          correctAnswer={
            questions[currentQuestion].answers.find(
              (answer) => answer.isCorrect === true
            )?.answerText || "No correct answer found"
          }
        />

        {currentQuestion === questions.length - 1 ? (
          <Button
            variant="neo"
            size="lg"
            onClick={handleSubmit}
          >
            Finish
          </Button>
        ) : (
          <Button
            variant="neo"
            size="lg"
            onClick={handleNext}
          >
            {started ? "Next" : "Start"}
          </Button>
        )}
      </footer>
    </div>
  );
};
