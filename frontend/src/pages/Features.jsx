import React from 'react';
import { Search, BarChart3, Shield, Cloud, Zap, Users, BookOpen, Bell, Globe, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: 'AI-Powered Search',
      description: 'Advanced search algorithms with natural language processing to help users find exactly what they need in seconds.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboards with insights on book circulation, user engagement, and collection performance.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, role-based access control, and compliance with international data protection standards.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: 'Cloud-Based Infrastructure',
      description: 'Scalable cloud architecture ensuring 99.9% uptime with automatic backups and disaster recovery.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast Performance',
      description: 'Optimized codebase and CDN integration deliver instant page loads and seamless user experience.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'User Management System',
      description: 'Comprehensive user profiles, borrowing history, personalized recommendations, and reading preferences.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Digital Catalog Management',
      description: 'Easily manage physical and digital collections with ISBN lookup, batch imports, and metadata enrichment.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: 'Smart Notifications',
      description: 'Automated reminders for due dates, hold notifications, and personalized reading recommendations.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Multi-Language Support',
      description: 'Interface available in 20+ languages with support for multi-script catalogs and Unicode compliance.',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobile Responsive',
      description: 'Fully responsive design that works flawlessly on desktops, tablets, and smartphones.',
      color: 'from-lime-500 to-lime-600'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Powerful Features</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover what makes LibraTech Solutions the most advanced library management platform in the industry.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need, All in One Place</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of features is designed to streamline every aspect of library management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-teal-200"
              >
                <div className={`bg-gradient-to-br ${feature.color} p-6 text-white`}>
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-lg mb-4 backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose LibraTech?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Industry-Leading Technology</h3>
                  <p className="text-gray-600">
                    Built on cutting-edge frameworks and cloud infrastructure, ensuring scalability and future-proof solutions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Track Record</h3>
                  <p className="text-gray-600">
                    Trusted by over 500 institutions worldwide with a 98% customer satisfaction rate.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Innovation</h3>
                  <p className="text-gray-600">
                    Regular updates with new features based on customer feedback and emerging technologies.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Exceptional Support</h3>
                  <p className="text-gray-600">
                    24/7 customer support with dedicated account managers for enterprise clients.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 font-bold text-xl">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cost-Effective Solutions</h3>
                  <p className="text-gray-600">
                    Flexible pricing plans that scale with your needs, delivering maximum ROI.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 font-bold text-xl">6</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Integration</h3>
                  <p className="text-gray-600">
                    Seamlessly integrates with existing systems through robust APIs and webhooks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-xl mb-8 text-blue-100">
            See how LibraTech Solutions can transform your library operations.
          </p>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Request a Demo
          </a>
        </div>
      </section>
    </div>
  );
};

export default Features;
