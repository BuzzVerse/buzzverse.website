"use client";

import React from "react";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {testimonials} from "@/data/cards";

export function PersonalCards() {
    return (
        <div
            className="h-screen rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-dot-white/[0.2] items-center overflow-hidden">

            <h2 className="my-16 md:mt-24 md:mb-36 text-4xl font-semibold text-gray-900 dark:text-white">
                Members
            </h2>
            <InfiniteMovingCards
                items={testimonials}
                direction="left"
                speed="normal"
            />
        </div>
    );
}

