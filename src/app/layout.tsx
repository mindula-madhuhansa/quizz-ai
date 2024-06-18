import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "TutorAI",
  description:
    "TutorAI is a quiz app that uses AI to generate questions and answers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={"dark"}>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
