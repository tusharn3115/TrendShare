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
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font text-white mb-6 leading-tight">
            Tech Trend
            <br />
              Sharing Platform
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover and share trending tech content from
            <span className="text-white border-b-2 border-blue-500"> GitHub, Dev.to,</span> and
            <span className="text-white border-b-2 border-blue-500"> Tech News and Blogs</span>.
            One-click sharing to amplify tech innovations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGenerateClick}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-400 duration-300 transition-colors disabled:opacity-70"
            >
              {loading ? 'Fetching Trends...' : 'Generate News / Blogs'}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 font-mono mt-8">
            <span className="px-4 py-2 bg-gray-800 rounded-full">Real-time Data</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full">Multi-source Feed</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full">Twitter Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
