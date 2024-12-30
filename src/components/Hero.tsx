import { useTopics } from '../context/TopicsContext';

export function Hero() {
  const { fetchTopics, loading } = useTopics();

  const handleGenerateClick = async () => {
    try {
      await fetchTopics();
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-800 to-black overflow-hidden">
      {/* Background gradient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-1/3 w-[500px] h-[500px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative pt-48 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Tech Trend
            <br />
            <span className="bg-gradient-to-r from-blue-500/70 to-purple-500/70 text-transparent bg-clip-text">
              Sharing Platform
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover and share trending tech content from
            <span className="text-white border-b-2 border-blue-500/70"> GitHub, Dev.to,</span> and
            <span className="text-white border-b-2 border-purple-500/70"> Hacker News</span>.
            One-click sharing to amplify tech innovations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGenerateClick}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70"
            >
              {loading ? 'Fetching Trends...' : 'Generate Trends'}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 font-mono mt-8">
            <span className="px-3 py-1 bg-gray-900 rounded-full">Real-time Data</span>
            <span className="px-3 py-1 bg-gray-900 rounded-full">Multi-source Feed</span>
            <span className="px-3 py-1 bg-gray-900 rounded-full">Twitter Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
