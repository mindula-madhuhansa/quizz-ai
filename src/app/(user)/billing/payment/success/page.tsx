import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SuccessPage() {
  return (
    <Alert
      variant="success"
      className="mt-12"
    >
      <AlertTitle className="mb-3 text-xl">Success</AlertTitle>
      <AlertDescription>
        Your payment was successful.
        <br />
        You can now access all the Pro features.{" "}
        <Link
          href="/dashboard"
          className="underline"
        >
          Go to Dashboard
        </Link>
      </AlertDescription>
    </Alert>
  );
}
