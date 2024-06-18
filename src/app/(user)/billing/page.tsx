import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { PRICE_ID } from "@/lib/utils";
import { auth, signIn } from "@/lib/auth";

import { ManageSubscription } from "./_components/manage-subscription";
import { SubscribeBtn } from "./_components/subscribe-btn";

export default async function BillingPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !session.user || !session.user.id) {
    signIn();
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });



  return (
    <div className="mt-12 p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Billing Details</h1>
      <p className="mb-3">
        {user?.subscribed
          ? `You are currently subscribed to the Premium plan.`
          : "You are currently on the free plan."}
      </p>
      {user?.subscribed ? (
        <ManageSubscription />
      ) : (
        <SubscribeBtn
          userId={userId}
          price={PRICE_ID}
        />
      )}
    </div>
  );
}
