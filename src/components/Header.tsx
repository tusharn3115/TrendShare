import { Share2 } from 'lucide-react';
import { Star } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
          <span className="logo font-mono text-lg sm:text-xl text-white">TechTrend</span>
        </div>
        
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a href="https://github.com/tusharn3115/TrendShare" target="_blank" rel="noopener noreferrer" 
             className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <Star className="h-5 w-5" />
            <span className="logo hidden sm:inline font-mono">Star on Github</span>
          </a>
        </div>
      </nav>
    </header>
  );
}