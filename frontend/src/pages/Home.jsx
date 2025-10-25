import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, TrendingUp, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering Readers with Digital Library Solutions
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Transform your library management with cutting-edge technology. Streamline operations, enhance user experience, and unlock the power of data-driven insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                >
                  Learn More <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <BookOpen className="h-32 w-32 mx-auto mb-4 text-white" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">LibraTech Solutions Pvt. Ltd</h3>
                  <p className="text-blue-100">Innovation in Library Management Since 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About LibraTech Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a leading provider of innovative library management solutions, dedicated to revolutionizing how educational institutions and public libraries operate in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">10,000+ Users</h3>
              <p className="text-gray-600">Trusted by institutions worldwide</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">5M+ Books</h3>
              <p className="text-gray-600">Managed through our platform</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">99.9% Uptime</h3>
              <p className="text-gray-600">Reliable and secure infrastructure</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Company Objectives</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Transformation</h3>
                  <p className="text-gray-600">
                    Help libraries transition seamlessly from traditional systems to modern, cloud-based solutions that enhance accessibility and efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">User Experience Excellence</h3>
                  <p className="text-gray-600">
                    Deliver intuitive, user-friendly interfaces that make library management effortless for both staff and patrons.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Insights</h3>
                  <p className="text-gray-600">
                    Provide powerful analytics and reporting tools that help institutions make informed decisions about their collections.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <Shield className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Security & Compliance</h3>
                  <p className="text-gray-600">
                    Ensure the highest standards of data security and privacy compliance to protect sensitive information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Library?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of institutions already using LibraTech Solutions to revolutionize their library management.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
