import { InferInsertModel } from "drizzle-orm";

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
