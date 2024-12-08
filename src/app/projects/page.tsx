import React from "react";
import LoraInformation from "@/components/ui/loraInformation";
import LoraFeatures from "@/components/ui/loraFeatures";
import WhyLoRa from "@/components/ui/whyLoRa";
import LoraProjects from "@/components/ui/loraProjects";

interface Project {
  id: number;
  documentId: string;
  name: string;
  description: string;
  photo?: {
    url: string;
  };
}

const fetchProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=photo`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
};

const page = async () => {
  const projects = await fetchProjects();
  return (
    <div className="container mx-auto py-40 px-4">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold mb-4">LoRa Technology</h1>
        <p className="text-xl text-muted-foreground">
          Revolutionizing IoT Communication
        </p>
      </div>
      <LoraInformation />
      <LoraFeatures />
      <WhyLoRa />
      <LoraProjects projects={projects} />
    </div>
  );
};

export default page;
