"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProjectModal from "@/components/ui/project-modal";
import ContentModal from "@/components/ui/content-modal";
import { useTranslations } from 'next-intl';
import { Link as IntlLink } from '@/i18n/routing';
import { LanguageSwitcher } from "@/components/ui/language-switcher";

interface Project {
  id: number;
  documentId: string;
  name: string;
  description: string;
  content?: string;
  createdAt?: string;
  author?: string;
  tags?: string[];
  photo?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

interface NewsItem {
  id: number;
  documentId: string;
  Title: string;
  description?: string;
  content?: string;
  date: string;
  createdAt?: string;
  author?: string;
  photo?: {
    id?: number;
    documentId?: string;
    name?: string;
    url: string;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: {
        url: string;
        width?: number;
        height?: number;
      };
      small?: {
        url: string;
        width?: number;
        height?: number;
      };
      medium?: { 
        url: string;
        width?: number;
        height?: number;
      };
      large?: { 
        url: string;
        width?: number;
        height?: number;
      };
    };
  } | null;
}

interface MediaItem {
  id: number;
  documentId: string;
  Title: string;
  Description?: string;
  Date: string;
  photo?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
}

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [recentMedia, setRecentMedia] = useState<MediaItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('Navigation');

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        // Fetch recent projects
        const projectsResponse = await fetch(`https://strapi.buzzverse.dev/api/projects?populate=photo&pagination[limit]=3&sort=createdAt:desc`);
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setRecentProjects(projectsData.data || []);
        }

        // Fetch recent news
        const newsResponse = await fetch(`https://strapi.buzzverse.dev/api/newses?populate=photo&pagination[limit]=3&sort=date:desc`);
        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          setRecentNews(newsData.data || []);
        }

        // Fetch recent media
        const mediaResponse = await fetch(`https://strapi.buzzverse.dev/api/medias?populate=photo&pagination[limit]=3&sort=Date:desc`);
        if (mediaResponse.ok) {
          const mediaData = await mediaResponse.json();
          setRecentMedia(mediaData.data || []);
        }
      } catch (error) {
        console.error('Error fetching recent data:', error);
      }
    };

    fetchRecentData();
  }, []);

  const extractImageUrl = (project: Project) => {
    if (!project.photo?.url) return '';
    const imageUrl = project.photo.formats?.small?.url || project.photo.formats?.thumbnail?.url || project.photo.url;
    return `https://strapi.buzzverse.dev${imageUrl}`;
  };

  const extractNewsImageUrl = (news: NewsItem) => {
    if (!news.photo?.url) return '';
    const imageUrl = news.photo.formats?.small?.url || news.photo.formats?.thumbnail?.url || news.photo.url;
    return `https://strapi.buzzverse.dev${imageUrl}`;
  };

  const extractMediaImageUrl = (media: MediaItem) => {
    if (!media.photo?.url) return '';
    const imageUrl = media.photo.formats?.small?.url || media.photo.formats?.thumbnail?.url || media.photo.url;
    return `https://strapi.buzzverse.dev${imageUrl}`;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pl-PL', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const scrollToSection = (sectionId: string) => {
    // Navigate to about page and then scroll to section
    router.push(`/about#${sectionId}`);
    
    // If we're already on the about page, scroll directly
    if (window.location.pathname === '/about') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleProjectClick = async (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
    setActive(null); // Close navbar menu
  };

  const handleNewsClick = async (news: NewsItem) => {
    setSelectedNews(news);
    setIsNewsModalOpen(true);
    setActive(null); // Close navbar menu
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const handleCloseNewsModal = () => {
    setIsNewsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 hidden md:block", className)}
    >
      <Menu setActive={setActive}>
        <IntlLink href="/">{t('home')}</IntlLink>
        <MenuItem setActive={setActive} active={active} item={t('projects')}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/projects">{t('allProjects')}</HoveredLink>
            
            {/* Recent Projects from Strapi */}
            {recentProjects.length > 0 && (
              <>
                <div className="border-t border-neutral-700 pt-3 mt-3">
                  <p className="text-xs text-neutral-400 mb-2">{t('recentProjects')}</p>
                  <div className="grid gap-2">
                    {recentProjects.map((project) => (
                      <div 
                        key={project.id} 
                        className="flex items-center space-x-3 p-2 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className="w-8 h-8 rounded overflow-hidden bg-neutral-700 flex-shrink-0">
                          {extractImageUrl(project) ? (
                            <img
                              src={extractImageUrl(project)}
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-600"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium truncate hover:text-yellow-400 transition-colors">
                            {project.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item={t('news')}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/news">All News</HoveredLink>
            
            {/* Recent News from Strapi */}
            {recentNews.length > 0 && (
              <>
                <div className="border-t border-neutral-700 pt-3 mt-3">
                  <p className="text-xs text-neutral-400 mb-2">{t('recentNews')}</p>
                  <div className="grid gap-2">
                    {recentNews.map((news) => (
                      <div 
                        key={news.id} 
                        className="flex items-center space-x-3 p-2 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                        onClick={() => handleNewsClick(news)}
                      >
                        <div className="w-8 h-8 rounded overflow-hidden bg-neutral-700 flex-shrink-0">
                          {extractNewsImageUrl(news) ? (
                            <img
                              src={extractNewsImageUrl(news)}
                              alt={news.Title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-600 flex items-center justify-center">
                              <span className="text-xs text-neutral-400">📰</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium truncate hover:text-yellow-400 transition-colors">
                            {news.Title}
                          </span>
                          <p className="text-xs text-neutral-500">{formatDate(news.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item={t('media')}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/media">{t('gallery')}</HoveredLink>
            
            {/* Recent Media from Strapi */}
            {recentMedia.length > 0 && (
              <>
                <div className="border-t border-neutral-700 pt-3 mt-3">
                  <p className="text-xs text-neutral-400 mb-2">{t('recentMedia')}</p>
                  <div className="grid grid-cols-3 gap-1">
                    {recentMedia.map((media) => (
                      <div key={media.id} className="group">
                        <HoveredLink href={`/media#${media.documentId}`}>
                          <div className="w-12 h-12 rounded overflow-hidden bg-neutral-700">
                            {extractMediaImageUrl(media) ? (
                              <img
                                src={extractMediaImageUrl(media)}
                                alt={media.Title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-600 flex items-center justify-center">
                                <span className="text-xs">📷</span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs mt-1 truncate text-center w-12">{media.Title}</p>
                        </HoveredLink>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item={t('about')}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/about">{t('aboutBuzzverse')}</HoveredLink>
            <button
              onClick={() => scrollToSection('team-section')}
              className="text-left text-sm hover:text-primary transition-colors"
            >
              {t('ourTeam')}
            </button>
          </div>
        </MenuItem>
      </Menu>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
      />

      {/* News Modal */}
      <ContentModal
        item={selectedNews}
        isOpen={isNewsModalOpen}
        onClose={handleCloseNewsModal}
        type="news"
      />
    </div>
  );
}
