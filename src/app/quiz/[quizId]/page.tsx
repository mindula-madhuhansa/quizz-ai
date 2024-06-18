import { eq } from "drizzle-orm";

import { db } from "@/db";
import { quizzes } from "@/db/schema";

import { QuizQuestions } from "../_components/quiz-questions";

export default async function QuizPage({
  params,
}: {
  params: {
    quizId: string;
  };
}) {
  const quizId = params.quizId;

  const quizzesData = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, parseInt(quizId)),
    with: {
      questions: {
        with: {
          answers: true,
        },
      },
    },
  });

  if (!quizId || !quizzesData || quizzesData.questions.length === 0) {
    return <div>Quizzes not found!</div>;
  }

  return <QuizQuestions quizz={quizzesData} />;
};

