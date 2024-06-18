"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { getStripe } from "@/lib/stripe-client";
import { Button } from "@/components/ui/button";

type Props = {
  userId?: string;
  price: string;
};

export const SubscribeBtn = ({ userId, price }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckout = async (price: string) => {
    if (!userId) {
      router.push("/api/auth/signin");
    }

    setLoading(true);

    try {
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
    <Button
      disabled={loading}
      onClick={() => handleCheckout(price)}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <span className="animate-pulse">Please Wait</span>
          <Loader2Icon className="size-4 animate-spin" />
        </div>
      ) : (
        "Upgrade To Pro"
      )}
    </Button>
  );
};
