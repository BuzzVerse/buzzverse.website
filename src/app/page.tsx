"use client";

import {SparklesPreview} from "@/app/(home)/components/sparkles-preview";
import {GlobeDemo} from "@/app/(home)/components/glove-preview";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-between">
          <div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex">
              <SparklesPreview/>
          </div>
          <div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex bg-cyan-950">
              <GlobeDemo/>
          </div>
          {/*<div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex bg-cyan-950">*/}
          {/*</div>*/}
      </main>
  );
}
