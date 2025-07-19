'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Play, Image as ImageIcon } from 'lucide-react';

interface MediaItem {
  id: number;
  documentId: string;
  Title: string;
  Description?: string;
  Type: string;
  URL?: string;
  Date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Image?: {
    id: number;
    url: string;
    name: string;
    alternativeText?: string;
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
      medium?: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

const fetchMediaItems = async (): Promise<MediaItem[]> => {
  try {
    console.log('Fetching media from:', `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/medias?populate=*`);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/medias?populate=*`, {
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
        console.error('Media endpoint not found');
      } else {
        console.error(`HTTP error ${res.status}: ${res.statusText}`);
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Fetched media items:', data.data?.length || 0, 'items');
    
    return data.data || [];
  } catch (error) {
    console.error("Error fetching media items:", error);
    return [];
  }
};

const getMediaTypeIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'video':
      return <Play className="w-4 h-4" />;
    case 'image':
    case 'photo':
      return <ImageIcon className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

const getMediaTypeColor = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'video':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'image':
    case 'photo':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'article':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
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
    return 'Invalid date';
  }
};

const MediaPage = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      const items = await fetchMediaItems();
      setMediaItems(items);
      setLoading(false);
    };

    loadMedia();
  }, []);

  const filteredMedia = selectedType === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.Type?.toLowerCase() === selectedType.toLowerCase());

  const uniqueTypes = Array.from(new Set(mediaItems.map(item => item.Type).filter(Boolean)));

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-buzzprimary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading media...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Media Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of photos, videos, and articles showcasing BuzzVerse activities and achievements.
          </p>
        </div>

        {/* Filter Buttons */}
        {uniqueTypes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-buzzprimary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All ({mediaItems.length})
            </button>
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedType === type
                    ? 'bg-buzzprimary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {getMediaTypeIcon(type)}
                {type} ({mediaItems.filter(item => item.Type === type).length})
              </button>
            ))}
          </div>
        )}

        {/* Media Grid */}
        {filteredMedia.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No media found</h3>
            <p className="text-muted-foreground">
              {selectedType === 'all' 
                ? 'No media items are available at the moment.'
                : `No ${selectedType} items found. Try selecting a different filter.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Image */}
                {item.Image && (
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                        item.Image.formats?.medium?.url || item.Image.formats?.small?.url || item.Image.url
                      }`}
                      alt={item.Image.alternativeText || item.Title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {item.URL && (
                        <a
                          href={item.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/90 text-black px-4 py-2 rounded-full font-medium hover:bg-white transition-colors flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <CardContent className="p-4">
                  {/* Type Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${getMediaTypeColor(item.Type)} flex items-center gap-1`}>
                      {getMediaTypeIcon(item.Type)}
                      {item.Type}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(item.Date || item.publishedAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {item.Title}
                  </h3>

                  {/* Description */}
                  {item.Description && (
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {item.Description}
                    </p>
                  )}

                  {/* Action Button */}
                  {item.URL && (
                    <a
                      href={item.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-buzzprimary hover:text-buzzprimary/80 font-medium text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Media
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;