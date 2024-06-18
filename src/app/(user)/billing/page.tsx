import { PRICE_ID } from "@/lib/utils";
import { getUser } from "@/utils/getUser";
import { auth, signIn } from "@/lib/auth";

import { ManageSubscription } from "./_components/manage-subscription";
import { SubscribeBtn } from "./_components/subscribe-btn";

export default async function BillingPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !session.user || !userId) {
    return signIn();
  }

  const user = await getUser(userId);

  return (
    <div className="mt-12 p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Billing Details</h1>
      <p className="mb-3">
        {user?.subscribed
          ? `You are currently subscribed to the Prop plan.`
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
