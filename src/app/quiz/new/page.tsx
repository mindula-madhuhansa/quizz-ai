import { auth, signIn } from "@/lib/auth";
import { getUserSubscription } from "@/actions/userSubscriptions";

import { UploadDoc } from "../_components/upload-doc";
import { UpgradeBtn } from "../_components/upgrade-btn";

export default async function NewQuizPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    signIn();
    return;
  }

  const subscribed = await getUserSubscription({
    userId,
  });

  return (
    <div className="flex flex-col flex-1">
      <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
        <>
          {subscribed ? (
            <>
              <h2 className="text-3xl font-bold mb-4">
                What do you want to review today? 🤔
              </h2>
              <UploadDoc />
            </>
          ) : (
            <UpgradeBtn />
          )}
        </>
      </main>
    </div>
  );
}
