import { Brain, Zap, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced AI',
    description: 'Powered by cutting-edge language models for human-like writing'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate content in seconds, not hours'
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Focus on what matters while AI handles the writing'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your content and data are always protected'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose CopyGenius?</h2>
          <p className="text-xl text-gray-600">Everything you need to create amazing content</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}