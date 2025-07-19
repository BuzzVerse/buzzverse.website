"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { sampleArcs } from "@/data/sample-arcs";
import { useTranslations } from 'next-intl';

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
    ssr: false,
  });

export function GitHubGlobe() {
    const t = useTranslations('HomePage');
    
    const globeConfig = {
        pointSize: 4,
        globeColor: "#222233",
        showAtmosphere: true,
        atmosphereColor: "#FFFFdd",
        atmosphereAltitude: 0.1,
        emissive: "#000000",
        emissiveIntensity: 0.7,
        shininess: 1.0,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#ccccff",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.7,
        rings: 2,
        maxRings: 3,
        initialPosition: { lat: 51.9274, lng: 15.3362 },
        autoRotate: true,
    };

    useEffect(() => {
        // Initial resize after mount
        const initialResize = () => {
            window.dispatchEvent(new Event("resize"));
        };
        
        // Delay initial resize to ensure proper initialization
        const timer = setTimeout(initialResize, 100);
        
        // Add resize listener for window changes
        const handleResize = () => {
            window.dispatchEvent(new Event("resize"));
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-row items-center justify-center py-8 md:py-20 h-auto md:h-screen bg-neutral-950 relative w-full">
          <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-auto md:h-[40rem] px-4">
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
              <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
                    {t('welcome')}
              </h2>
              <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto mb-4 md:mb-0">
                        {t('description')}
              </p>
            </motion.div>
            <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-neutral-950 z-40" />
            <div className="relative md:absolute w-full md:-bottom-20 h-72 md:h-full z-10 mt-4 md:mt-0">
              <World data={sampleArcs} globeConfig={globeConfig} />
            </div>
          </div>
        </div>
      );
    }