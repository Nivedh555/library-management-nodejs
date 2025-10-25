import React from 'react';
import { Code, Database, Cloud, GraduationCap, BarChart, Headphones, Wrench, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12" />,
      title: 'Library Software Development',
      description: 'Custom-built library management solutions tailored to your unique requirements and workflows.',
      features: [
        'Custom module development',
        'Third-party API integrations',
        'Legacy system migration',
        'White-label solutions'
      ],
      color: 'bg-gradient-to-br from-teal-500 to-teal-600'
    },
    {
      icon: <GraduationCap className="h-12 w-12" />,
      title: 'Student Management Integration',
      description: 'Seamlessly connect your library system with student information systems for unified access control.',
      features: [
        'Single sign-on (SSO)',
        'Automated user provisioning',
        'Grade-level based restrictions',
        'Academic calendar sync'
      ],
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: <Cloud className="h-12 w-12" />,
      title: 'Cloud Backup & Recovery',
      description: 'Enterprise-grade data protection with automated backups and instant recovery capabilities.',
      features: [
        'Hourly automated backups',
        'Multi-region redundancy',
        'Point-in-time recovery',
        '99.99% data durability'
      ],
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: 'Data Migration Services',
      description: 'Safe and efficient migration of your existing library data to our modern platform.',
      features: [
        'Zero-downtime migration',
        'Data validation & cleanup',
        'Barcode system conversion',
        'Historical data preservation'
      ],
      color: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    {
      icon: <BarChart className="h-12 w-12" />,
      title: 'Analytics & Reporting',
      description: 'Advanced analytics dashboards with customizable reports for data-driven decision making.',
      features: [
        'Real-time usage metrics',
        'Custom report builder',
        'Predictive analytics',
        'Export to multiple formats'
      ],
      color: 'bg-gradient-to-br from-pink-500 to-pink-600'
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: 'Training & Onboarding',
      description: 'Comprehensive training programs to ensure your team masters the platform quickly.',
      features: [
        'On-site training sessions',
        'Video tutorials library',
        'Live webinars',
        'Certification programs'
      ],
      color: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: 'Maintenance & Support',
      description: '24/7 technical support with guaranteed response times and proactive system monitoring.',
      features: [
        'Priority ticket resolution',
        'Dedicated account manager',
        'Proactive system monitoring',
        'Regular health check-ups'
      ],
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'Security Audits',
      description: 'Regular security assessments and compliance checks to protect your sensitive data.',
      features: [
        'Penetration testing',
        'GDPR compliance review',
        'Access control audit',
        'Security best practices'
      ],
      color: 'bg-gradient-to-br from-violet-500 to-violet-600'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive solutions and support services designed to maximize your library's potential.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Library Technology Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From implementation to ongoing support, we provide everything you need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className={`${service.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-white/90">{service.description}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-600 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Service Approach</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">
                We analyze your needs and design a customized solution plan.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Implementation</h3>
              <p className="text-gray-600">
                Our experts deploy and configure the system to your specifications.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Training</h3>
              <p className="text-gray-600">
                Comprehensive training ensures your team is ready to excel.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                24/7 support and regular updates keep your system running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-12 border border-teal-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Need a Custom Solution?</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Every library is unique. Let's discuss how we can tailor our services to meet your specific requirements.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/contact"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Contact Sales
              </a>
              <a
                href="/about"
                className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let us help transform your library with our comprehensive service offerings.
          </p>
          <a
            href="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Start Free Trial
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
