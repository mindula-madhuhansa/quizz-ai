"use client";

import { useState } from "react";
import { FlameIcon, LockIcon } from "lucide-react";

import { PRICE_ID, cn } from "@/lib/utils";
import { getStripe } from "@/lib/stripe-client";

export const UpgradeBtn = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onNavigateToUpgrade = async (price: string) => {
    try {
      setLoading(true);
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }).then((res) => res.json());

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={() => onNavigateToUpgrade(PRICE_ID)}
      className={cn(
        "rounded-md bg-primary hover:bg-primary/90 p-10 w-full sm:size-80 transition",
        loading && "animate-pulse"
      )}
    >
      <div className="flex flex-col items-center cursor-pointer w-full h-full">
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">
            Unlock the full experience 🚀
          </h2>
          <LockIcon className="size-12" />
        </div>
        <div className="flex items-center gap-2 bg-white p-3 rounded-full text-black">
          Upgrade
          <FlameIcon className="size-4" />
        </div>
      </div>
    </button>
  );
};
