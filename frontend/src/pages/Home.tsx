import { Link } from 'react-router-dom';
import { Leaf, Gift, Sprout, Trash2, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Gift,
      title: 'Food Donations',
      description: 'Connect donors with those in need, reducing food waste and fighting hunger.',
    },
    {
      icon: Sprout,
      title: 'Farmer Support',
      description: 'Empower farmers with tools to track yields, manage crops, and grow sustainably.',
    },
    {
      icon: Trash2,
      title: 'Waste Reduction',
      description: 'Monitor and minimize food waste with expiry tracking and analytics.',
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Build stronger food systems by connecting all stakeholders in one platform.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Usana</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              Building a Sustainable Future
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Food Security with{' '}
            <span className="text-primary-600">Usana</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A comprehensive platform connecting donors, farmers, and communities to reduce food waste,
            improve nutrition, and build sustainable food systems.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn-primary px-8 py-4 text-lg flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-outline px-8 py-4 text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">1,000+</div>
            <div className="text-gray-600">Donations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Farmers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-gray-600">Communities</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-gray-600">Meals Served</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600">
            Powerful tools to transform food security in your community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-xl transition-all">
              <div className="bg-primary-100 p-4 rounded-lg w-fit mb-4">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of donors, farmers, and organizations building sustainable food systems
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Usana</span>
            </div>
            <p className="text-gray-600">© 2024 Usana. Building a sustainable food future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
