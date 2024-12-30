import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrendingTopics } from './components/TrendingTopics';
import { TopicsProvider } from './context/TopicsContext';

function App() {
  return (
    <TopicsProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <Hero />
          <TrendingTopics />
        </main>
      </div>
    </TopicsProvider>
  );
}

export default App;