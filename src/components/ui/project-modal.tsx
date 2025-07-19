"use client";
import React from 'react';
import Image from 'next/image';
import { X, Calendar, User, ExternalLink } from 'lucide-react';
import { useTranslations } from '@/lib/translations';

interface Project {
  id: number;
  documentId: string;
  name: string;
  description: string;
  content?: string; // Pełna treść artykułu
  createdAt?: string;
  author?: string;
  tags?: string[];
  photo?: {
    url: string;
    formats?: {
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const t = useTranslations('Common');
  
  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getImageUrl = () => {
    if (!project.photo?.url) return '';
    // Użyj większego formatu dla modal
    const imageUrl = project.photo.formats?.large?.url || project.photo.formats?.medium?.url || project.photo.url;
    return `https://strapi.buzzverse.dev${imageUrl}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-neutral-900 rounded-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden border border-neutral-700 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-neutral-800/80 backdrop-blur-sm text-white hover:bg-neutral-700 transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header Image */}
          {project.photo?.url && (
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src={getImageUrl()}
                alt={project.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {project.name}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-neutral-400">
              {project.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(project.createdAt)}
                </div>
              )}
              {project.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {project.author}
                </div>
              )}
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full border border-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-lg text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Full Content */}
            {project.content ? (
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-neutral-200 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br/>') }}
                />
              </div>
            ) : (
              <div className="bg-neutral-800/50 rounded-lg p-6 text-center">
                <p className="text-neutral-400">
                  {t('fullContentPlaceholder')}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8 border-t border-neutral-800 mt-8">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
