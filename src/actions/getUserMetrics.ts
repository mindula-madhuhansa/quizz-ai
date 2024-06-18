"use server";

import { avg, count, eq } from "drizzle-orm";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { quizzes, questions, quizzSubmissions, users } from "@/db/schema";

export const getUserMetrics = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  //   get total # of quizzes
  const numQuizzes = await db
    .select({
      value: count(),
    })
    .from(quizzes)
    .where(eq(quizzes.userId, userId));

  // get total # of questions
  const numQuestions = await db
    .select({
      value: count(),
    })
    .from(questions)
    .innerJoin(quizzes, eq(questions.quizzId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, userId))
    .where(eq(quizzes.userId, userId));

  // get total # of submissions
  const numSubmissions = await db
    .select({
      value: count(),
    })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(quizzes.userId, userId));

  // get the avarage score
  const avgScore = await db
    .select({
      value: avg(quizzSubmissions.score),
    })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(quizzes.userId, userId));

  return [
    { label: "# of Quizzes", value: numQuizzes[0].value },
    { label: "# of Questions", value: numQuestions[0].value },
    { label: "# of Submissions", value: numSubmissions[0].value },
    { label: "Average Score", value: avgScore[0].value },
  ];
};
