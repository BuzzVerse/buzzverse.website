"use client";
import React from "react";
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import {sampleArcs} from "@/data/sample-arcs";

const World = dynamic(
    () => import("@/components/ui/globe").then((m) => m.World),
    {
        ssr: false,
    }
);

export function GitHubGlobe() {
    const globeConfig = {
        pointSize: 4,
        globeColor: "#0D2137",
        showAtmosphere: true,
        atmosphereColor: "#FFFFFF",
        atmosphereAltitude: 0.1,
        emissive: "#062056",
        emissiveIntensity: 0.2,
        shininess: 0.9,
        polygonColor: "rgba(49,154,6,0.7)",
        ambientLight: "#ffffff",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.7,
        rings: 2,
        maxRings: 3,
        initialPosition: {lat: 51.9274, lng: 15.3362},
        autoRotate: true,
        autoRotateSpeed: 0.1,
    };

    return (
        <div className="flex flex-row h-full dark:bg-black bg-white relative w-full">
            <div className="mx-auto w-full relative overflow-hidden h-full py-4">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                    }}
                    className="div"
                >
                    <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white pt-10">
                        Welcome to BuzzVerse
                    </h2>
                    <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
                        We are a passionate group of students dedicated to fostering a love
                        for science, exploration, and collaboration within our university
                        community.
                    </p>
                </motion.div>
                <div
                    className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40"/>
                <div className="absolute w-full h-3/4 -bottom-20 z-10">
                    <World data={sampleArcs} globeConfig={globeConfig}/>
                </div>
            </div>
        </div>
    );
}
