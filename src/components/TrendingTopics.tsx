import { useTopics } from '../context/TopicsContext';
import { TrendCard } from './TrendCard';
import { Loader } from './Loader';
import { ChevronDown } from 'lucide-react';

export function TrendingTopics() {
  const { topics, loading, error, hasMore, loadMore } = useTopics();

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 rounded-lg max-w-2xl mx-auto mt-8">
        {error}
      </div>
    );
  }

  if (!topics || topics.length === 0) return null;

  return (
    <section className="px-4 pb-16 sm:pb-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {topics.map((topic, index) => (
            <TrendCard key={`${topic.source}-${index}`} topic={topic} />
          ))}
        </div>
        
        {hasMore && (
          <div className="flex justify-center px-4">
            <button
              onClick={loadMore}
              disabled={loading}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <span>Load More</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}