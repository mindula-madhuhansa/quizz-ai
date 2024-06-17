import { InferInsertModel } from "drizzle-orm";

import { db } from "@/db";
import {
  quizzes,
  questions as dbQuestions,
  questionAnswers,
} from "@/db/schema";

export type Quiz = InferInsertModel<typeof quizzes>;
export type Question = InferInsertModel<typeof dbQuestions>;
export type Answer = InferInsertModel<typeof questionAnswers>;

export interface QuizData extends Quiz {
  questions: Array<Question & { answers?: Answer[] }>;
}

export default async function saveQuiz(quizData: QuizData) {
  const { name, description, questions } = quizData;

  const newQuiz = await db
    .insert(quizzes)
    .values({
      name,
      description,
    })
    .returning({ insertedId: quizzes.id });
  const quizId = newQuiz[0].insertedId;

  await db.transaction(async (trx) => {
    for (const question of questions) {
      const [{ questionId }] = await trx
        .insert(dbQuestions)
        .values({
          questionText: question.questionText,
          quizId,
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
  return { quizId };
}
