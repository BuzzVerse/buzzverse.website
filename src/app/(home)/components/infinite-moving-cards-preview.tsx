"use client";

import React from "react";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {testimonials} from "@/data/cards";

export function InfiniteMovingCardsPreview() {
    return (
        <div
            className="h-screen rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center overflow-hidden">

            <h2 className="my-16 md:mt-24 md:mb-36 text-4xl font-semibold text-gray-900 dark:text-white">
                Members
            </h2>

            <InfiniteMovingCards
                items={testimonials}
                direction="left"
                speed="slow"
            />
        </div>
    );
}

