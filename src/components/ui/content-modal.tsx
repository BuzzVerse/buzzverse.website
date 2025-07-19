"use client";
import React from 'react';
import Image from 'next/image';
import { X, Calendar, User, Play, ImageIcon } from 'lucide-react';

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
  content?: string;
  Date: string;
  createdAt?: string;
  photo?: {
    url: string;
    formats?: {
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

type ContentItem = NewsItem | MediaItem;

interface ContentModalProps {
  item: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
  type: 'news' | 'media';
}

const ContentModal: React.FC<ContentModalProps> = ({ item, isOpen, onClose, type }) => {
  if (!isOpen || !item) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getImageUrl = () => {
    if (!item.photo?.url) return '';
    const imageUrl = item.photo.formats?.large?.url || item.photo.formats?.medium?.url || item.photo.url;
    return `https://strapi.buzzverse.dev${imageUrl}`;
  };

  const formatDate = (dateString: string) => {
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

  const getTitle = () => item.Title || '';
  const getDescription = () => {
    if ('description' in item) return item.description || '';
    if ('Description' in item) return item.Description || '';
    return '';
  };
  const getDate = () => {
    if ('date' in item) return item.date;
    if ('Date' in item) return item.Date;
    return '';
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
          {item.photo?.url ? (
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src={getImageUrl()}
                alt={getTitle()}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="h-64 md:h-80 w-full bg-neutral-800 flex items-center justify-center">
              <div className="text-center text-neutral-400">
                {type === 'media' ? (
                  <ImageIcon className="w-16 h-16 mx-auto mb-4" />
                ) : (
                  <Play className="w-16 h-16 mx-auto mb-4" />
                )}
                <p>No image available</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                {type === 'news' ? '📰 News' : '📷 Media'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {getTitle()}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(getDate())}
              </div>
              {'author' in item && item.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {item.author}
                </div>
              )}
            </div>

            {/* Description */}
            {getDescription() && (
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  {getDescription()}
                </p>
              </div>
            )}

            {/* Full Content */}
            {item.content ? (
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-neutral-200 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br/>') }}
                />
              </div>
            ) : (
              <div className="bg-neutral-800/50 rounded-lg p-6 text-center">
                <p className="text-neutral-400">
                  Pełna treść artykułu będzie dostępna wkrótce...
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8 border-t border-neutral-800 mt-8">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
              >
                Zamknij
              </button>
              {type === 'media' && (
                <button 
                  onClick={() => window.open('/media', '_blank')}
                  className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Zobacz więcej media
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
