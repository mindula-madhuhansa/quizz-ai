import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function getUser(userId: string) {
  if (!userId) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}
