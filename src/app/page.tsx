"use client";

import {Sparkles} from "@/app/(home)/components/sparkles";
import {GitHubGlobe} from "@/app/(home)/components/glove-preview";
import {TrackingBeam} from "@/components/ui/tracking-beam";
import {BeeMonitorPin} from "@/app/(home)/components/animated-pin-preview";
import {AboutTeamStory} from "@/app/(home)/components/about-team-story";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between bg-neutral-950 w-full">
            <TrackingBeam>         
                <div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex ">
                    <Sparkles/>
                </div>
                <div className="h-screen w-full items-center justify-between font-mono text-sm lg:flex">
                    <GitHubGlobe/>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <AboutTeamStory />
                </div>
                <div className="h-full">
                    <BeeMonitorPin/>
                </div>
            </TrackingBeam>
        </main>
    );
}
