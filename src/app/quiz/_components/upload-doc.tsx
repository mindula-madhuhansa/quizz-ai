"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const UploadDoc = () => {
  const router = useRouter();

  const [document, setDocument] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!document) {
      setError("Please upload the document");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("pdf", document as Blob);

    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        const data = await res.json();
        const quizId = data.quizId;

        router.push(`/quiz/${quizId}`);
      }
    } catch (error) {
      console.error("error while generating", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full"
        >
          <label
            htmlFor="document"
            className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative"
          >
            <div className="absolute inset-0 m-auto flex justify-center items-center">
              {document && document?.name
                ? document.name
                : "Select a file to upload 📄"}
            </div>
            <input
              type="file"
              id="document"
              accept="application/pdf"
              onChange={(e) => setDocument(e.target.files?.[0])}
              className="relative block w-full h-full z-50 opacity-0 cursor-pointer"
            />
          </label>

          {error && <p className="text-rose-500">{error}</p>}

          <Button
            type="submit"
            size="lg"
            className="mt-4"
            disabled={isLoading}
          >
            Generate Quiz ✨
          </Button>
        </form>
      )}
    </div>
  );
};
