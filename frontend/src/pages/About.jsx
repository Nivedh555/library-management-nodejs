import React from 'react';
import { Building2, Target, Eye, Award } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'With 15+ years in EdTech, Dr. Kumar leads LibraTech with a vision to democratize library access through technology.'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former tech lead at major cloud platforms, Priya brings deep expertise in scalable architecture and AI integration.'
    },
    {
      name: 'Arjun Mehta',
      role: 'VP of Product',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Product visionary with a passion for user experience, Arjun ensures our solutions exceed customer expectations.'
    },
    {
      name: 'Sneha Patel',
      role: 'Head of Customer Success',
      image: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Dedicated to client satisfaction, Sneha leads our support team to deliver world-class service to every customer.'
    },
    {
      name: 'Vikram Singh',
      role: 'Lead Developer',
      image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Full-stack expert who transforms complex requirements into elegant, performant solutions.'
    },
    {
      name: 'Ananya Desai',
      role: 'UX Designer',
      image: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Design thinking specialist who crafts intuitive interfaces that users love to interact with.'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About LibraTech Solutions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Pioneering the future of library management through innovation, dedication, and a commitment to excellence.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2020, LibraTech Solutions Pvt. Ltd emerged from a simple observation: libraries worldwide struggled with outdated management systems that hindered their potential to serve communities effectively.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our founders, coming from backgrounds in library science and software engineering, united with a common goal to bridge this gap. Today, we serve over 500 institutions across 15 countries, managing millions of books and serving thousands of users daily.
              </p>
              <p className="text-lg text-gray-600">
                We continue to innovate, incorporating AI, cloud computing, and advanced analytics to create solutions that are not just functional, but transformative.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl p-8 flex items-center justify-center">
              <Building2 className="h-64 w-64 text-teal-600" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-xl">
              <Eye className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-700">
                To become the global leader in library technology, empowering every library to reach its full potential through innovative, accessible, and sustainable solutions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To revolutionize library management by delivering cutting-edge software that simplifies operations, enhances user experience, and drives data-informed decision-making.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <Award className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Values</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Innovation First</li>
                <li>Customer Success</li>
                <li>Data Security</li>
                <li>Continuous Learning</li>
                <li>Collaboration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse team of experts committed to transforming library management worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl mb-8 text-blue-100">
            We're always looking for talented individuals who share our passion for innovation and excellence.
          </p>
          <a
            href="/careers"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
