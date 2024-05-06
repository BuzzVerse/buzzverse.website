"use client";

import {Sparkles} from "@/app/(home)/components/sparkles";
import {GitHubGlobe} from "@/app/(home)/components/glove-preview";
import {TrackingBeam} from "@/components/ui/tracking-beam";
import {PersonalCards} from "@/app/(home)/components/personal-cards";
import {BeeMonitorPin} from "@/app/(home)/components/animated-pin-preview";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between">
            <TrackingBeam>
                <div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex">
                    <Sparkles/>
                </div>
                <div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex bg-cyan-950">
                    <GitHubGlobe/>
                </div>
                <div className="h-full">
                    <PersonalCards/>
                </div>
                <div className="h-full">
                    <BeeMonitorPin/>
                </div>
            </TrackingBeam>
        </main>
    );
}
