"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const content = [
    {
        title: "About us",
        description: "The BuzzVerse Science Club is a team of information technology enthusiasts. The aim of the club is to influence real changes in the environment and to develop skills related to embedded systems, programming as well as the design and implementation of embedded devices.",
        image: "/about_us.jpg",
        icon: "👥"
    },
    {
        title: "Team",
        description: "We are a dynamic and ambitious team consisting of students from various fields. We cooperate with GlobalLogic specialists. Manager, programmer or supervisor - Each member of our science club brings unique knowledge and gains new experience.",
        image: "/team.jpg",
        icon: "🚀"
    },
    {
        title: "Projects",
        description: "As part of the club's activities, we implement projects that allow us to develop practical skills. Thanks to the support of local companies and the university, our projects have a real impact on the development of technology in the Zielona Góra region.",
        image: "/projects.jpg",
        icon: "⚡"
    },
    {
        title: "Bee Monitor",
        description: "Our latest project is Bee Monitor. Thanks to the LoRa technology that enables communication over long distances, we can monitor parameters such as temperature or humidity in a given place. The collected data is transferred to the mast and then to the database, where it is finally presented on our website.",
        image: "/beemonitor.jpg",
        icon: "🐝"
    },
];

export function AboutTeamStory() {
    return (
        <div className="py-16 px-4 bg-neutral-950 w-full">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What we do?
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Discover our mission, team, and innovative projects that make a difference
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group"
                        >
                            <Card className="bg-neutral-900/50 border-neutral-800 overflow-hidden h-full hover:bg-neutral-900/70 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 text-3xl bg-yellow-500/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-neutral-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
