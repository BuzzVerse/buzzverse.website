"use client";

import React from "react";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {testimonials} from "@/data/cards";

export function PersonalCards() {
    return (
        <div
            className="h-screen w-full rounded-md flex flex-col antialiased bg-neutral-950 items-center overflow-hidden">
            <h2 className="mb-20 mt-20 text-4xl font-semibold text-white">
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

