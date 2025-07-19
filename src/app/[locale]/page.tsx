"use client";

import {Sparkles} from "./(home)/components/sparkles";
import {GitHubGlobe} from "./(home)/components/glove-preview";
import {TrackingBeam} from "@/components/ui/tracking-beam";
import {BeeMonitorPin} from "./(home)/components/animated-pin-preview";
import {AboutTeamStory} from "./(home)/components/about-team-story";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between bg-neutral-950 w-full min-h-screen">
            <TrackingBeam>         
                <div className="h-auto md:h-screen w-full items-center justify-between font-mono text-sm lg:flex py-4 md:py-0">
                    <Sparkles/>
                </div>
                <div className="h-auto md:h-screen w-full items-center justify-between font-mono text-sm lg:flex py-4 md:py-0">
                    <GitHubGlobe/>
                </div>
                <div className="w-full h-auto md:h-full flex items-center justify-center py-4 md:py-0">
                    <AboutTeamStory />
                </div>
                <div className="h-auto md:h-full py-4 md:py-0">
                    <BeeMonitorPin/>
                </div>
            </TrackingBeam>
        </main>
    );
}
