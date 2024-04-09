"use client";
import React from "react";
import {PinContainer} from "@/components/ui/animated-pin-demo";
import Image from "next/image";

export function AnimatedPinDemo() {

    return (
        <div className="bg-white dark:bg-black">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-black dark:text-white py-10">
                BuzzVerse Project
            </h2>
            <div className="h-[30rem] md:h-[40rem] w-full flex flex-col items-center">
                <h2 className="text-center text-2xl font-bold text-black dark:text-white py-8">
                    BeeMonitor
                </h2>
                <PinContainer title="/Github/BuzzVerse" href="https://github.com/BuzzVerse">
                    <div
                        className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            BeeMonitor
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
    <span className="text-slate-500 ">
        Check our source code
    </span>
                        </div>
                        <div className="flex flex-1 w-full h-full rounded-lg mt-4">
                            <Image
                                src="/bee.jpg"
                                alt="alt"
                                layout="fill"
                                objectFit="cover" // or "contain" depending on your needs
                                objectPosition="center"
                            />
                        </div>
                    </div>
                </PinContainer>
            </div>
        </div>
    );
}
