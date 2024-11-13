import React from 'react';
import { TimelineDemo } from '../(home)/components/timeline';
import OurTeam from '@/components/ui/ourteam';

interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  description: string;
  photo?: {
    url: string;
  };
}

const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/members?populate=photo`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
};


const AboutUs = async () => {
  const teamMembers = await fetchTeamMembers();

  return (
    <div>
      <TimelineDemo />
      <OurTeam teamMembers={teamMembers} />
    </div>
  );
};

export default AboutUs;
