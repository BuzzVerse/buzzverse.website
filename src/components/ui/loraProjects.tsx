import { Badge } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card'
import Image from 'next/image'
import { GetStaticProps } from 'next'

interface Project {
  id: number;
  documentId: string;
  name: string;
  description: string;
  photo?: {
    url: string;
  };
}

interface ProjectsProps {
  projects: Project[]
}

const extractImageUrl = (project: Project) => {
  return project.photo?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${project.photo.url}` : '';
};

const loraProjects: React.FC<ProjectsProps> = ({ projects }) => {
  console.log("Projects:", projects);

  if (!projects || projects.length === 0) {
    return <p>No projects found.</p>;
  }
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center pt-20">
        Our LoRa-Based Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={extractImageUrl(project)} // Wywołanie z member
                alt={`${project.name}'s profile`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default loraProjects
