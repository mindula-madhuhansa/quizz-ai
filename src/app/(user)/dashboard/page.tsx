import { eq } from "drizzle-orm";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { quizzes } from "@/db/schema";

import { QuizzesTable, Quiz } from "./_components/quizzes-table";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <p>User not found</p>;
  }

  const userQuizzes: Quiz[] = await db.query.quizzes.findMany({
    where: eq(quizzes.userId, userId),
  });

  console.log(userQuizzes);

  return <QuizzesTable quizzes={userQuizzes} />;
}
