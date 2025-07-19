"use client";
import React from "react";
import {PinContainer} from "@/components/ui/animated-pin-demo";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from '@/lib/translations';

export function BeeMonitorPin() {
    const t = useTranslations('HomePage.beeMonitorProject');

    return (
        <div className="bg-neutral-950">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-white py-10">
                {t('title')}
            </h2>
            <div className="h-[30rem] md:h-[40rem] w-full flex flex-col items-center">
                <h2 className="text-center text-2xl font-bold text-white py-8">
                    {t('projectName')}
                </h2>
                <PinContainer title="BuzzVerse" href="https://github.com/BuzzVerse">
                    <div
                        className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            {t('projectName')}
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
    <span className="text-slate-500 ">
        {t('description')}
    </span>
                        </div>
                        <Link href="https://github.com/BuzzVerse">
                        <div className="flex flex-1 w-full rounded-lg mt-4 relative overflow-hidden h-32 bg-neutral-800">
                            <Image
                                src="/bee.jpg"
                                alt="BeeMonitor project"
                                width={320}
                                height={128}
                                className="object-cover w-full h-full rounded"
                                priority={false}
                                onError={(e) => {
                                    console.error('Failed to load bee.jpg');
                                }}
                                onLoad={() => {
                                    console.log('Successfully loaded bee.jpg');
                                }}
                            />
                        </div>
                    </Link>
                    </div>
                </PinContainer>
            </div>
        </div>
    );
}
