import Image from "next/image";
import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[720px]">
      <Image
        src="/images/owl-loading.png"
        alt="Owl Loading"
        height={300}
        width={300}
        className="animate-pulse"
      />
      <h1 className="flex items-center gap-x-4 text-3xl md:text-4xl font-bold text-center">
        Loading...
        <Loader2Icon className="animate-spin size-10" />
      </h1>
    </div>
  );
}
