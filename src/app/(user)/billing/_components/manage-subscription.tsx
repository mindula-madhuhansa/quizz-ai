"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const ManageSubscription = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const redirectToCustomerPortal = async () => {
    setLoading(true);

    try {
      const { url } = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      router.push(url.url);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={redirectToCustomerPortal}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <span className="animate-pulse">Please Wait</span>
          <Loader2Icon className="size-4 animate-spin" />
        </div>
      ) : (
        "Manage Subscription"
      )}
    </Button>
  );
};
