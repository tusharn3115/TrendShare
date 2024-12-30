import React, { createContext, useContext, useState } from 'react';
import { Topic } from '../types';
import {
  fetchGithubTrends,
  fetchDevToPosts,
  fetchHNStories,
  fetchRedditPosts,
  fetchStackOverflowQuestions
} from '../utils/api';

interface TopicsContextType {
  topics: Topic[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  fetchTopics: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

export function TopicsProvider({ children }: { children: React.ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchAllSources = async (page: number) => {
    const results = await Promise.all([
      fetchGithubTrends(page),
      fetchDevToPosts(page),
      fetchHNStories(page),
      fetchRedditPosts(page),
      fetchStackOverflowQuestions(page)
    ]);
    
    return results.flat();
  };

  const fetchTopics = async () => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    
    try {
      const newTopics = await fetchAllSources(1);
      setTopics(newTopics);
      setHasMore(newTopics.length > 0);
    } catch (err) {
      setError('Failed to fetch topics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newTopics = await fetchAllSources(nextPage);
      
      if (newTopics.length === 0) {
        setHasMore(false);
      } else {
        setTopics(prev => [...prev, ...newTopics]);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      setError('Failed to load more topics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TopicsContext.Provider value={{ 
      topics, 
      loading, 
      error, 
      hasMore,
      currentPage,
      fetchTopics,
      loadMore 
    }}>
      {children}
    </TopicsContext.Provider>
  );
}

export function useTopics() {
  const context = useContext(TopicsContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicsProvider');
  }
  return context;
}