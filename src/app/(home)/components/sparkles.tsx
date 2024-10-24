"use client";
import React from "react";
import {SparklesCore} from "@/components/ui/sparkles-core";

export function Sparkles() {
    return (
        <div className=" w-full h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20">
                BuzzVerse
            </h1>
            <div className="w-screen h-40 relative">
                {/* Gradients */}
                <div
                    className="absolute  left-1/3 top-0 bg-gradient-to-r from-transparent via-Buzzprimary to-transparent h-[2px] w-1/2 "/>
                <div
                    className="absolute left-1/4 top-0 bg-gradient-to-r from-transparent via-Buzzprimary to-transparent h-[5px] w-1/2 blur-sm"/>

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div
                    className="absolute inset-0 w-full h-full bg-neutral-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
        </div>
    );
}
