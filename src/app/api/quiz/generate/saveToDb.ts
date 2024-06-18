import { InferInsertModel } from "drizzle-orm";

import {
  quizzes,
  questions as dbQuestions,
  questionAnswers,
} from "@/db/schema";
import { db } from "@/db";
import { auth } from "@/lib/auth";

export type Quiz = InferInsertModel<typeof quizzes>;
export type Question = InferInsertModel<typeof dbQuestions>;
export type Answer = InferInsertModel<typeof questionAnswers>;

export interface QuizData extends Quiz {
  questions: Array<Question & { answers?: Answer[] }>;
}

export default async function saveQuiz(quizData: QuizData) {
  const { name, description, questions } = quizData;
  const session = await auth();
  const userId = session?.user?.id;

  const newQuiz = await db
    .insert(quizzes)
    .values({
      name,
      description,
      userId,
    })
    .returning({ insertedId: quizzes.id });
  const quizzId = newQuiz[0].insertedId;

  await db.transaction(async (trx) => {
    for (const question of questions) {
      const [{ questionId }] = await trx
        .insert(dbQuestions)
        .values({
          questionText: question.questionText,
          quizzId,
        })
        .returning({ questionId: dbQuestions.id });

      if (question.answers && question.answers.length > 0) {
        await trx.insert(questionAnswers).values(
          question.answers.map((answer) => ({
            answerText: answer.answerText,
            isCorrect: answer.isCorrect,
            questionId,
          }))
        );
      }
    }
  });
  return { quizzId };
}
