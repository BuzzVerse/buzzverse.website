"use client";
import React, { useEffect } from 'react';
import { TimelineDemo } from '../(home)/components/timeline';
import OurTeam from '@/components/ui/ourteam';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Lightbulb, Zap } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  Role: string[];
  photo?: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        url: string;
        width: number;
        height: number;
      };
      small?: {
        url: string;
        width: number;
        height: number;
      };
    };
  } | null;
}

interface AboutWrapperProps {
  teamMembers: TeamMember[];
}

const AboutWrapper: React.FC<AboutWrapperProps> = ({ teamMembers }) => {
  const t = useTranslations('AboutPage');

  useEffect(() => {
    // Handle hash navigation on component mount
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500); // Wait for content to load
      }
    };

    handleHashNavigation();

    // Also handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  const values = [
    {
      icon: Target,
      title: t('values.mission.title'),
      description: t('values.mission.description')
    },
    {
      icon: Lightbulb,
      title: t('values.innovation.title'),
      description: t('values.innovation.description')
    },
    {
      icon: Users,
      title: t('values.collaboration.title'),
      description: t('values.collaboration.description')
    },
    {
      icon: Zap,
      title: t('values.impact.title'),
      description: t('values.impact.description')
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 px-3 py-1 text-sm font-semibold">
              About BuzzVerse
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              We are a passionate science club dedicated to advancing IoT technology and fostering innovation in our university community.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Who We Are
              </h2>
              <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                The BuzzVerse Science Club is a team of information technology enthusiasts. 
                The aim of the club is to influence real changes in the environment and to develop 
                skills related to embedded systems, programming as well as the design and implementation 
                of embedded devices.
              </p>
              <p className="text-lg text-neutral-300 leading-relaxed">
                We work with cutting-edge LoRa technology, creating innovative IoT solutions that 
                bridge the gap between academic learning and real-world applications.
              </p>
            </div>
            <div className="relative">
              <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-700">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/about_us.jpg"
                    alt="BuzzVerse Team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {values.map((value, index) => (
              <Card key={index} className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-all duration-300 group hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-neutral-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-neutral-950 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 px-3 py-1 text-sm font-semibold">
              Our Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('timelineTitle')}
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              {t('timelineDescription')}
            </p>
          </div>
          <div className="relative">
            <TimelineDemo />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 px-3 py-1 text-sm font-semibold">
              Meet the Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('ourTeamTitle')}
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Our diverse team of passionate students and professionals working together to push the boundaries of IoT technology.
            </p>
          </div>
          <OurTeam teamMembers={teamMembers} />
        </div>
      </section>
    </div>
  );
};

export default AboutWrapper;
