import { useState } from 'react';
import { Topic } from '../types';
import { fetchGithubTrends, fetchDevToPosts, fetchHNStories } from '../utils/api';

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [githubTrends, devToPosts, hnStories] = await Promise.all([
        fetchGithubTrends(),
        fetchDevToPosts(),
        fetchHNStories()
      ]);
      
      setTopics([...githubTrends, ...devToPosts, ...hnStories]);
    } catch (err) {
      setError('Failed to fetch topics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { topics, loading, error, fetchTopics };
}