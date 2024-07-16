"use client";

import {cn} from "@/lib/utils";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {cardTestimonial} from "@/data/cards";
import Link from 'next/link';

export const InfiniteMovingCards = ({
                                        items,
                                        direction = "left",
                                        speed = "normal",
                                        pauseOnHover = false,
                                        className,
                                    }: {
    items: cardTestimonial[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "50s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <Link href={`https://github.com/${item.GitHubUsername}`} key={idx}>
                        <li className=" text-white w-[360px] h-[360px] md:w-[460px] md:h-[460px] max-w-full relative rounded-2xl border flex-shrink-0 border-white p-2 md:p-4 flex flex-col justify-between"
                            key={item.name}
                        >
                            <div aria-hidden="true"
                                 className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"></div>
                            <div className="">
                            <span className="font-bold text-xl">
                               {item.name}
                            </span>
                                <br/>
                                <p className="pb-1">
                                    {item.role}
                                </p>
                            </div>
                            <div className='w-full h-full relative image-container'>
                                <Image src={item.linkToImage} alt={item.name} layout="fill" objectFit="cover"
                                       objectPosition="center top"/>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};