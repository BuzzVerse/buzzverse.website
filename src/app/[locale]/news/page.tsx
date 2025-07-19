'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import ContentModal from '@/components/ui/content-modal';
import { useTranslations } from 'next-intl';

interface NewsItem {
  id: number;
  documentId: string;
  Title: string;
  description?: string;
  content?: string; // Pełna treść artykułu
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author?: string;
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
      medium?: {
        url: string;
        width: number;
        height: number;
      };
      large?: {
        url: string;
        width: number;
        height: number;
      };
    };
  } | null;
}

const fetchNewsItems = async (): Promise<NewsItem[]> => {
  try {
    console.log('Fetching news from:', `https://strapi.buzzverse.dev/api/newses?populate=photo`);
    
    const res = await fetch(`https://strapi.buzzverse.dev/api/newses?populate=photo`, {
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
        console.error('News endpoint not found');
      } else if (res.status === 400) {
        console.error('Bad request - photo field might not exist, trying without populate...');
        
        // Fallback - try without populate
        const basicRes = await fetch(`https://strapi.buzzverse.dev/api/newses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        
        if (basicRes.ok) {
          const basicData = await basicRes.json();
          console.log('Fetched basic news data:', basicData.data?.length || 0, 'items');
          return basicData.data || [];
        }
      } else {
        console.error(`HTTP error ${res.status}: ${res.statusText}`);
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Fetched news items with photos:', data.data?.length || 0, 'items');
    
    return data.data || [];
  } catch (error) {
    console.error("Error fetching news items:", error);
    return [];
  }
};

// Funkcja pomocnicza do wyodrębnienia adresu URL obrazu z pola 'photo'
const extractImageUrl = (news: NewsItem) => {
  if (!news.photo?.url) return '';
  
  // Użyj small/thumbnail dla news - mniejsze obrazy
  const imageUrl = news.photo.formats?.small?.url || news.photo.formats?.thumbnail?.url || news.photo.url;
  return `https://strapi.buzzverse.dev${imageUrl}`;
};

// Funkcja do pobierania szczegółów konkretnego artykułu
const fetchNewsDetails = async (documentId: string): Promise<NewsItem | null> => {
  try {
    const url = `https://strapi.buzzverse.dev/api/newses/${documentId}?populate=photo`;
    console.log('🔍 Fetching news details from:', url);
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.error('❌ Failed to fetch news details:', res.status);
      return null;
    }
    
    const data = await res.json();
    console.log('📊 News details:', data);
    
    return data.data || null;
  } catch (error) {
    console.error("💥 Error fetching news details:", error);
    return null;
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

const formatRelativeTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return 'Unknown';
  }
};

const NewsPage = () => {
  const t = useTranslations('NewsPage');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const items = await fetchNewsItems();
      // Sort by date - newest first
      const sortedItems = items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setNewsItems(sortedItems);
      setLoading(false);
    };

    loadNews();
  }, []);

  const handleNewsClick = async (news: NewsItem) => {
    // Najpierw pokaż podstawowe informacje
    setSelectedNews(news);
    setIsModalOpen(true);
    
    // Następnie pobierz szczegółowe informacje jeśli nie ma content
    if (!news.content) {
      const detailedNews = await fetchNewsDetails(news.documentId);
      if (detailedNews) {
        setSelectedNews(detailedNews);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
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
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* News List */}
        {newsItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Clock className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('noNews')}</h3>
            <p className="text-muted-foreground">
              {t('noNewsMessage')}
            </p>
          </div>
        ) : (
          <div className="space-y-8 pb-16">
            {newsItems.map((item, index) => {
              const imageUrl = extractImageUrl(item);
              const isLatest = index === 0;
              
              return (
                <Card key={item.id} className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${isLatest ? 'border-buzzprimary/20 bg-buzzprimary/5' : ''}`}>
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section - Side */}
                    {imageUrl && (
                      <div className="md:w-1/3 lg:w-1/4">
                        <img
                          src={imageUrl}
                          alt={item.Title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Content Section - Main */}
                    <CardContent className={`${imageUrl ? 'md:w-2/3 lg:w-3/4' : 'w-full'} p-6`}>
                      {/* Header with badges */}
                      <div className="flex items-center gap-3 mb-4">
                        {isLatest && (
                          <Badge className="bg-buzzprimary text-white">
                            Latest
                          </Badge>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatRelativeTime(item.publishedAt)}
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className={`font-bold mb-3 ${isLatest ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`}>
                        {item.Title}
                      </h2>

                      {/* Description */}
                      {item.description && (
                        <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                          {item.description}
                        </p>
                      )}

                      {/* Read More Button */}
                      <button 
                        onClick={() => handleNewsClick(item)}
                        className="inline-flex items-center gap-2 text-buzzprimary hover:text-buzzprimary/80 font-medium transition-colors group"
                      >
                        {t('readMore')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Metadata Footer */}
                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          BuzzVerse Team
                        </div>
                        <div>
                          ID: {item.documentId.slice(0, 8)}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* News Modal */}
        <ContentModal
          item={selectedNews}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          type="news"
        />
      </div>
    </div>
  );
};

export default NewsPage;