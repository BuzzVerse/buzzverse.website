"use client";

import {SparklesPreview} from "@/app/(home)/components/sparkles-preview";
import {GlobeDemo} from "@/app/(home)/components/glove-preview";
import {TrackingBeam} from "@/components/ui/tracking-beam";
import {InfiniteMovingCardsPreview} from "@/app/(home)/components/infinite-moving-cards-preview";
import {AnimatedPinDemo} from "@/app/(home)/components/animated-pin-preview";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between">
            <TrackingBeam>
                <div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex">
                    <SparklesPreview/>
                </div>
                <div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex bg-cyan-950">
                    <GlobeDemo/>
                </div>
                <div className="h-full">
                    <InfiniteMovingCardsPreview/>
                </div>
                <div className="h-full">
                    <AnimatedPinDemo/>
                </div>
            </TrackingBeam>
        </main>
    );
}
