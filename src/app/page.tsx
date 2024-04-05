"use client";

import {SparklesPreview} from "@/app/(home)/components/sparkles-preview";
import {GlobeDemo} from "@/app/(home)/components/glove-preview";

export default function Home() {
  return (
      <main className="flex h-[200vh] flex-col items-center justify-between">
          <div className=" h-1/2 w-full items-center justify-between font-mono text-sm lg:flex">
              <SparklesPreview/>
          </div>
          <div className=" h-1/2 w-full items-center justify-between font-mono text-sm lg:flex ">
              <GlobeDemo/>
          </div>
      </main>
  );
}
