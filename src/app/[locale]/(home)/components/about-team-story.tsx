"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from 'next-intl';

export function AboutTeamStory() {
    const t = useTranslations('HomePage.features');
    const tContent = useTranslations('HomePage.aboutContent');
    
    const content = [
        {
            title: tContent('aboutUs.title'),
            description: tContent('aboutUs.description'),
            image: "/about_us.jpg",
            icon: "👥"
        },
        {
            title: tContent('team.title'),
            description: tContent('team.description'),
            image: "/team.jpg",
            icon: "🚀"
        },
        {
            title: tContent('projects.title'),
            description: tContent('projects.description'),
            image: "/projects.jpg",
            icon: "⚡"
        },
        {
            title: tContent('beeMonitor.title'),
            description: tContent('beeMonitor.description'),
            image: "/beemonitor.jpg",
            icon: "🐝"
        },
    ];

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
                        {t('title')}
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        {t('subtitle')}
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
                                <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={400}
                                        height={192}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        priority={index < 2}
                                        onError={(e) => {
                                            console.error(`Failed to load image: ${item.image}`);
                                        }}
                                        onLoad={() => {
                                            console.log(`Successfully loaded image: ${item.image}`);
                                        }}
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
