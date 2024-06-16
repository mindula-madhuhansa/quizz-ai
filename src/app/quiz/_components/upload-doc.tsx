"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export const UploadDoc = () => {
  const [document, setDocument] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(document);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
        <label
          htmlFor="document"
          className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative"
        >
          <div className="absolute inset-0 m-auto flex justify-center items-center cursor-pointer">
            {document && document?.name
              ? document.name
              : "Select a file to upload 📄"}
          </div>
        </label>
        <input
          type="file"
          id="document"
          accept="application/pdf"
          onChange={(e) => setDocument(e.target.files?.[0])}
          className="relative block w-full h-full z-50 opacity-0"
        />
        <Button
          type="submit"
          size="lg"
          className="mt-2"
          disabled={!document || isLoading}
        >
          Generate Quiz ✨
        </Button>
      </form>
    </div>
  );
};
