import { Share, ExternalLink, MessageCircle, Heart } from 'lucide-react';
import { Topic } from '../types';

interface TrendCardProps {
  topic: Topic;
}

export function TrendCard({ topic }: TrendCardProps) {
  const shareToTwitter = () => {
    const text = `Check out this tech trend:\n\n${topic.title}\n\nVia ${topic.source} #tech #coding`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(topic.url)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:scale-[1.02] duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center
            ${topic.source === 'GitHub' ? 'bg-purple-900/30' : 
              topic.source === 'Dev.to' ? 'bg-green-900/30' :
              'bg-blue-900/30'}`}>
            <span className="text-lg font-bold">{topic.source[0]}</span>
          </div>
          <div>
            <h4 className="text-white font-semibold">{topic.source}</h4>
            <span className="text-xs text-gray-500">{topic.timestamp}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium
          ${topic.source === 'GitHub' ? 'bg-purple-900/20 text-purple-300' : 
            topic.source === 'Dev.to' ? 'bg-green-900/20 text-green-300' :
            'bg-blue-900/20 text-blue-300'}`}>
          {topic.score.toLocaleString()} {topic.source === 'GitHub' ? '★' : '♥'}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2 hover:text-blue-400 cursor-pointer">
          {topic.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">{topic.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {topic.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded-md text-xs">
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1.5 text-gray-400 hover:text-blue-400 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">12</span>
          </button>
          <button className="flex items-center space-x-1.5 text-gray-400 hover:text-pink-400 transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-xs">48</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <a
            href={topic.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-xs"
          >
            <ExternalLink className="h-3 w-3" />
            <span>View</span>
          </a>
          <button
            onClick={shareToTwitter}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors text-xs"
          >
            <Share className="h-3 w-3" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}