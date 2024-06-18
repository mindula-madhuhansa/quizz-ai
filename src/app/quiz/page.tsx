"use client";

import { useState } from "react";
import { ChevronLeftIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { ResultCard } from "./_components/result-card";
import { QuizSubmission } from "./_components/quiz-submission";

const questions = [
  {
    questionText: "What is the capital of France?",
    answers: [
      { answerText: "Paris", isCorrect: true, id: 1 },
      { answerText: "London", isCorrect: false, id: 2 },
      { answerText: "Berlin", isCorrect: false, id: 3 },
      { answerText: "Madrid", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is the capital of Germany?",
    answers: [
      { answerText: "Paris", isCorrect: false, id: 1 },
      { answerText: "London", isCorrect: false, id: 2 },
      { answerText: "Berlin", isCorrect: true, id: 3 },
      { answerText: "Madrid", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is the capital of Spain?",
    answers: [
      { answerText: "Paris", isCorrect: false, id: 1 },
      { answerText: "London", isCorrect: false, id: 2 },
      { answerText: "Berlin", isCorrect: false, id: 3 },
      { answerText: "Madrid", isCorrect: true, id: 4 },
    ],
  },
  {
    questionText: "What is the capital of England?",
    answers: [
      { answerText: "Paris", isCorrect: false, id: 1 },
      { answerText: "London", isCorrect: true, id: 2 },
      { answerText: "Berlin", isCorrect: false, id: 3 },
      { answerText: "Madrid", isCorrect: false, id: 4 },
    ],
  },
];

export default function Quiz() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

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

    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answer: any) => {
    setSelectedAnswer(answer.id);

    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
    }

    const currentPercentage = ((currentQuestion + 1) / questions.length) * 100;
    setPercentage(currentPercentage);

    setIsCorrect(isCurrentCorrect);
  };

  const scorePercentage: number = Math.round((score / questions.length) * 100);

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
          >
            <ChevronLeftIcon />
          </Button>

          <Progress value={percentage} />

          <Button
            size="icon"
            variant="outline"
          >
            <XIcon />
          </Button>
        </header>
      </div>

      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-semibold">Welcome to Quiz Page👋</h1>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold">
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
                    onClick={() => handleAnswer(answer)}
                  >
                    <p className="whitespace-normal">{answer.answerText}</p>
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
            )?.answerText || ""
          }
        />
        <Button
          variant="neo"
          size="lg"
          onClick={handleNext}
        >
          {started
            ? currentQuestion === questions.length - 1
              ? "Finish"
              : "Next"
            : "Start"}
        </Button>
      </footer>
    </div>
  );
}
