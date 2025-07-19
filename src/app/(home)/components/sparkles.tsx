"use client";
import React from "react";
import {SparklesCore} from "@/components/ui/sparkles-core";

export function Sparkles() {
    return (
        <div className="w-full h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20 px-4">
                BuzzVerse
            </h1>
            <div className="w-full h-32 md:h-40 relative">
                {/* Gradients */}
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-Buzzprimary to-transparent h-[2px] w-1/2 md:w-1/3 "/>
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-Buzzprimary to-transparent h-[5px] w-2/3 md:w-1/2 blur-sm"/>

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.3}
                    maxSize={0.8}
                    particleDensity={600}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div
                    className="absolute inset-0 w-full h-full bg-neutral-950 [mask-image:radial-gradient(200px_120px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
        </div>
    );
}
