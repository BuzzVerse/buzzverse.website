"use client";
import React, { useEffect } from 'react';
import { TimelineDemo } from '../(home)/components/timeline';
import OurTeam from '@/components/ui/ourteam';

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

  return (
    <div>
      <TimelineDemo />
      <OurTeam teamMembers={teamMembers} />
    </div>
  );
};

export default AboutWrapper;
