"use client";

import React from "react";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {testimonials} from "@/data/cards";

export function PersonalCards() {
    return (
        <div
            className="h-screen w-full rounded-md flex flex-col antialiased bg-black items-center overflow-hidden">

            <h2 className="my-16 md:mt-24 md:mb-36 text-4xl font-semibold text-white">
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

