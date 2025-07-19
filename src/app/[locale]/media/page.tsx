'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Play, Image as ImageIcon } from 'lucide-react';
import { useTranslations } from '@/lib/translations';

interface MediaItem {
  id: number;
  documentId: string;
  Title: string;
  Description?: string;
  Date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Dodaj wszystkie możliwe pola dla obrazów
  photo?: any;
  image?: any;
  Image?: any;
  Picture?: any;
  media?: any;
  Media?: any;
  [key: string]: any; // Dla elastyczności
}

const fetchMediaItems = async (): Promise<MediaItem[]> => {
  try {
    // Spróbuj najpierw z populate dla wszystkich pól
    let url = `https://strapi.buzzverse.dev/api/medias?populate=*`;
    console.log('🔍 Fetching media from:', url);
    
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('📡 Response status for populate=*:', res.status);

    // Jeśli populate=* nie działa, spróbuj bez populate
    if (!res.ok) {
      console.log('🔄 Trying without populate...');
      url = `https://strapi.buzzverse.dev/api/medias`;
      res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      console.log('📡 Response status without populate:', res.status);
    }

    if (!res.ok) {
      if (res.status === 403) {
        console.error('🔒 Access forbidden - check Strapi permissions for public role');
      } else if (res.status === 404) {
        console.error('🔍 Media endpoint not found');
      } else {
        console.error(`❌ HTTP error ${res.status}: ${res.statusText}`);
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('📊 Full API Response:', JSON.stringify(data, null, 2));
    console.log('📦 Media items count:', data.data?.length || 0);
    
    // Sprawdź strukturę pierwszego elementu
    if (data.data && data.data.length > 0) {
      console.log('🔍 First media item structure:', JSON.stringify(data.data[0], null, 2));
    }
    
    return data.data || [];
  } catch (error) {
    console.error("💥 Error fetching media items:", error);
    return [];
  }
};

// Funkcja pomocnicza do wyodrębnienia adresu URL obrazu
const extractImageUrl = (media: MediaItem) => {
  // Sprawdź wszystkie możliwe pola z obrazami
  const imageFields = ['photo', 'image', 'Image', 'Picture', 'media', 'Media'];
  
  for (const field of imageFields) {
    const imageData = media[field];
    if (imageData) {
      // Jeśli to obiekt z url
      if (imageData.url) {
        return `https://strapi.buzzverse.dev${imageData.url}`;
      }
      // Jeśli to obiekt z formats
      if (imageData.formats) {
        const format = imageData.formats.medium || imageData.formats.small || imageData.formats.thumbnail;
        if (format?.url) {
          return `https://strapi.buzzverse.dev${format.url}`;
        }
      }
      // Jeśli to array (multiple images)
      if (Array.isArray(imageData) && imageData.length > 0 && imageData[0].url) {
        return `https://strapi.buzzverse.dev${imageData[0].url}`;
      }
    }
  }
  
  // Sprawdź wszystkie klucze obiektu czy może zawierać URL obrazu
  for (const [key, value] of Object.entries(media)) {
    if (value && typeof value === 'object') {
      if (value.url && typeof value.url === 'string' && value.url.includes('/uploads/')) {
        console.log(`🖼️ Found image in field "${key}":`, value.url);
        return `https://strapi.buzzverse.dev${value.url}`;
      }
    }
  }
  
  return '';
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
  const t = useTranslations('MediaPage');
  const tCommon = useTranslations('Common');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      const items = await fetchMediaItems();
      setMediaItems(items);
      setLoading(false);
    };

    loadMedia();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-buzzprimary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Media Grid */}
        {mediaItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('noMedia')}</h3>
            <p className="text-muted-foreground">
              {t('noMediaMessage')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {mediaItems.map((item) => {
              const imageUrl = extractImageUrl(item);
              
              return (
              <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-transparent">
                {/* Image - główny element */}
                {imageUrl ? (
                  <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src={imageUrl}
                      alt={item.Title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        console.error('Image failed to load:', imageUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Overlay z informacjami */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-semibold text-xl mb-2 line-clamp-2">
                          {item.Title}
                        </h3>
                        {item.Description && (
                          <p className="text-sm text-white/80 line-clamp-3 mb-3">
                            {item.Description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.Date)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-20 h-20 text-muted-foreground/40 mx-auto mb-4" />
                      <h3 className="font-medium text-lg mb-2">{item.Title}</h3>
                      <p className="text-sm text-muted-foreground">{tCommon('noImage')}</p>
                    </div>
                  </div>
                )}
              </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;