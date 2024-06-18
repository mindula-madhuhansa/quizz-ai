"use server";

import { avg, count, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { quizzes, questions, quizzSubmissions, users } from "@/db/schema";

export const getHeatMapData = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  const data = await db
    .select({
      createdAt: quizzSubmissions.createdAt,
      count: sql<number>`cast(count(${quizzSubmissions.id}) as int)`,
    })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .groupBy(quizzSubmissions.createdAt);

  return { data };
};
