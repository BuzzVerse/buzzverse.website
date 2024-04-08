"use client";

import React, { useEffect, useState } from "react";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {testimonials} from "@/data/cards";

export function InfiniteMovingCardsPreview() {
    return (
        <div className="h-screen rounded-md flex flex-col antialiased bg-white dark:bg-Buzztertiary dark:bg-grid-white/[0.05] items-center justify-center overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                />
        </div>
    );
}

