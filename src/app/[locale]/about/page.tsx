import React from 'react';
import AboutWrapper from './AboutWrapper';

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

const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    console.log('Fetching team members from:', `https://strapi.buzzverse.dev/api/members?populate=photo`);
    
    const res = await fetch(`https://strapi.buzzverse.dev/api/members?populate=photo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
      if (res.status === 403) {
        console.error('Access forbidden - check Strapi permissions for public role');
      } else if (res.status === 404) {
        console.error('Members endpoint not found');
      } else {
        console.error(`HTTP error ${res.status}: ${res.statusText}`);
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Fetched team members:', data.data?.length || 0, 'members');
    
    return data.data || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
};


const AboutUs = async () => {
  const teamMembers = await fetchTeamMembers();

  return (
    <AboutWrapper teamMembers={teamMembers} />
  );
};

export default AboutUs;
