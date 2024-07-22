"use client";
import React from "react";
import Image from "next/image";
import {StickyScroll} from "@/components/ui/sticky-scroll-reveal";

const content = [
    {
        title: "About us",
        description:
            "The BuzzVerse Science Club is a team of information technology enthusiasts. The aim of the club is to influence real changes in the environment and to develop skills related to embedded systems, programming as well as the design and implementation of embedded devices.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/about_us.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
},
    {
        title: "Team",
        description:
           "We are a dynamic and ambitious team consisting of students from various fields. We cooperate with GlobalLogic specialists. Manager, programmer or supervisor - Each member of our science club brings unique knowledge and gains new experience.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/team.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Projects",
        description:
            "As part of the club's activities, we implement projects that allow us to develop practical skills. Thanks to the support of local companies and the university, our projects have a real impact on the development of technology in the Zielona Góra region.",
            content: (
                <div className="h-full w-full  flex items-center justify-center text-white">
                    <Image
                        src="/projects.jpg"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                        alt="linear board demo"
                    />
                </div>
            ),
    },
    {
        title: "Bee Monitor",
        description:
            "Our latest project is Bee Monitor. Thanks to the LoRa technology that enables communication over long distances, we can monitor parameters such as temperature or humidity in a given place. The collected data is transferred to the mast and then to the database, where it is finally presented on our website. Our initiative not only provides valuable information for bee breeders, but also supports the protection of these insects important to the ecosystem.",
            content: (
                <div className="h-full w-full  flex items-center justify-center text-white">
                    <Image
                        src="/beemonitor.jpg"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                        alt="linear board demo"
                    />
                </div>
            ),
    },
];
export function AboutTeamStory() {
    return (
        <div className="p-5 h-screen flex justify-center items-center bg-black w-full flex-col">
            <h1 className="mb-20 mt-20 text-4xl font-semibold text-white">What we do?</h1>
            <StickyScroll content={content} />
        </div>
    );
}
