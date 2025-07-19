"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Zap, Globe, Shield, Battery, Cpu, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectModal from "@/components/ui/project-modal";

interface Project {
  id: number;
  documentId: string;
  name: string;
  description: string;
  content?: string; // Pełna treść artykułu z Strapi
  createdAt?: string;
  author?: string;
  tags?: string[];
  photo?: {
    url: string;
    formats?: {
      medium?: { url: string };
      large?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

const fetchProjects = async (): Promise<Project[]> => {
  try {
    // Fetch z dodatkowymi polami
    const url = `https://strapi.buzzverse.dev/api/projects?populate=photo&fields=*`;
    console.log('🔍 Fetching from:', url);
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Dodaj cache dla lepszej wydajności
      next: { revalidate: 60 }
    });
    
    console.log('📡 Response status:', res.status);
    
    if (!res.ok) {
      console.error('❌ Fetch failed:', res.status, res.statusText);
      // Sprawdź czy to problem z CORS lub uprawnieniami
      if (res.status === 403) {
        console.error('🔒 Access forbidden - check Strapi permissions');
      }
      if (res.status === 404) {
        console.error('🔍 API endpoint not found - check URL');
      }
      return [];
    }
    
    const data = await res.json();
    console.log('📊 API Response:', data);
    console.log('📦 Projects count:', data.data?.length || 0);
    
    return data.data || [];
  } catch (error) {
    console.error("💥 Error fetching projects:", error);
    return [];
  }
};

// Funkcja do pobierania szczegółów konkretnego projektu
const fetchProjectDetails = async (documentId: string): Promise<Project | null> => {
  try {
    const url = `https://strapi.buzzverse.dev/api/projects/${documentId}?populate=photo`;
    console.log('🔍 Fetching project details from:', url);
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.error('❌ Failed to fetch project details:', res.status);
      return null;
    }
    
    const data = await res.json();
    console.log('📊 Project details:', data);
    
    return data.data || null;
  } catch (error) {
    console.error("💥 Error fetching project details:", error);
    return null;
  }
};

const features = [
  {
    icon: Wifi,
    title: "Long Range",
    description: "Cover several kilometers in urban areas and up to 15 km in rural settings"
  },
  {
    icon: Zap,
    title: "Low Power",
    description: "Devices can operate for years on a single battery charge"
  },
  {
    icon: Globe,
    title: "Wide Coverage",
    description: "A single gateway can cover thousands of end-devices"
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Built-in encryption and security features"
  },
  {
    icon: Battery,
    title: "Energy Efficient",
    description: "Optimized for battery-powered IoT devices"
  },
  {
    icon: Cpu,
    title: "Cost Effective",
    description: "Low infrastructure and operational costs"
  }
];

const page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const handleProjectClick = async (project: Project) => {
    // Najpierw pokaż podstawowe informacje
    setSelectedProject(project);
    setIsModalOpen(true);
    
    // Następnie pobierz szczegółowe informacje jeśli nie ma content
    if (!project.content) {
      const detailedProject = await fetchProjectDetails(project.documentId);
      if (detailedProject) {
        setSelectedProject(detailedProject);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading projects...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-950 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 px-3 py-1 text-sm font-semibold">
              Innovation Hub
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Our Workshop
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing IoT Communication with cutting-edge{" "}
              <span className="text-yellow-400 font-semibold">LoRa Technology</span>
            </p>
          </div>
        </div>
      </section>

      {/* LoRa Technology Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 px-3 py-1 text-sm font-semibold">
                Technology Focus
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                What technology our{" "}
                <span className="text-yellow-400">projects</span> use?
              </h2>
              <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                Our science club is developing cutting-edge embedded systems with a focus on 
                device-to-device communication. We've chosen LoRa technology as our primary 
                communication protocol for its exceptional range and efficiency.
              </p>
              <div className="flex items-center gap-2 text-yellow-400">
                <span className="font-semibold">Learn more about LoRa</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className="relative">
              <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-700 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center h-64">
                  <Image
                    src="/loralogo.png"
                    alt="LoRa Technology"
                    width={300}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 px-3 py-1 text-sm font-semibold">
              Key Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why <span className="text-yellow-400">LoRa</span>?
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Discover the powerful features that make LoRa the perfect choice for our IoT projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <Card className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-all duration-300 h-full hover:scale-105">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 px-3 py-1 text-sm font-semibold">
              Our Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-yellow-400">Projects</span>
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Explore our innovative projects that showcase the power of LoRa technology
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={project.id} className="group">
                  <Card 
                    className="bg-neutral-900/50 border-neutral-800 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden h-full hover:scale-102 cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.photo?.url && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={`https://strapi.buzzverse.dev${project.photo.url}`}
                          alt={project.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-neutral-300 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-yellow-400 font-medium">
                        <span>Learn more</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-neutral-400">Our exciting projects are currently in development</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center bg-neutral-900 rounded-3xl p-12 border border-neutral-800">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to innovate with us?
            </h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Join our science club and be part of the next generation of IoT innovators
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default page;
