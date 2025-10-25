import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹8-12 LPA',
      description: 'Join our engineering team to build scalable library management solutions using modern web technologies.',
      responsibilities: [
        'Develop and maintain full-stack web applications using React, Node.js, and MongoDB',
        'Design and implement RESTful APIs',
        'Collaborate with product and design teams to deliver high-quality features',
        'Write clean, maintainable, and well-tested code',
        'Participate in code reviews and technical discussions'
      ],
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '3+ years of experience in full-stack development',
        'Strong proficiency in JavaScript, React, and Node.js',
        'Experience with MongoDB or other NoSQL databases',
        'Understanding of RESTful API design and microservices architecture',
        'Excellent problem-solving and communication skills'
      ]
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹6-10 LPA',
      description: 'Create beautiful, intuitive interfaces that delight our users and make library management effortless.',
      responsibilities: [
        'Design user interfaces for web and mobile applications',
        'Conduct user research and usability testing',
        'Create wireframes, prototypes, and high-fidelity mockups',
        'Maintain and evolve our design system',
        'Collaborate with developers to ensure design implementation quality'
      ],
      requirements: [
        'Bachelor\'s degree in Design, HCI, or related field',
        '2+ years of UI/UX design experience',
        'Proficiency in Figma, Sketch, or Adobe XD',
        'Strong portfolio demonstrating design thinking process',
        'Understanding of HTML/CSS and design system principles',
        'Excellent visual design skills with attention to detail'
      ]
    },
    {
      id: 3,
      title: 'Node.js Backend Developer',
      department: 'Engineering',
      location: 'Mumbai, India',
      type: 'Full-time',
      salary: '₹7-11 LPA',
      description: 'Build robust backend systems that power our library management platform used by thousands of institutions.',
      responsibilities: [
        'Develop and maintain Node.js backend services',
        'Design database schemas and optimize queries',
        'Implement authentication and authorization systems',
        'Integrate third-party APIs and services',
        'Monitor and optimize application performance'
      ],
      requirements: [
        'Bachelor\'s degree in Computer Science or equivalent experience',
        '2+ years of Node.js backend development experience',
        'Strong understanding of JavaScript/TypeScript',
        'Experience with Express.js or similar frameworks',
        'Knowledge of SQL and NoSQL databases',
        'Familiarity with cloud platforms (AWS, Azure, or GCP)'
      ]
    },
    {
      id: 4,
      title: 'Node.js Intern',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Internship',
      salary: '₹15,000-25,000/month',
      description: 'Launch your career in software development by working on real-world projects with experienced mentors.',
      responsibilities: [
        'Assist in developing backend features using Node.js',
        'Write and maintain unit tests',
        'Fix bugs and implement small features',
        'Participate in team meetings and code reviews',
        'Learn and apply best practices in software development'
      ],
      requirements: [
        'Currently pursuing or recently completed Bachelor\'s degree in Computer Science',
        'Basic understanding of JavaScript and Node.js',
        'Familiarity with Git and version control',
        'Strong willingness to learn and adapt',
        'Good communication skills',
        'Prior internship or project experience is a plus'
      ]
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Pune, India',
      type: 'Full-time',
      salary: '₹9-14 LPA',
      description: 'Ensure our platform runs smoothly with robust CI/CD pipelines and infrastructure automation.',
      responsibilities: [
        'Manage cloud infrastructure on AWS/Azure',
        'Build and maintain CI/CD pipelines',
        'Implement monitoring and logging solutions',
        'Optimize application performance and costs',
        'Ensure security and compliance best practices'
      ],
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '3+ years of DevOps experience',
        'Strong knowledge of AWS or Azure',
        'Experience with Docker and Kubernetes',
        'Proficiency in scripting (Bash, Python)',
        'Understanding of infrastructure as code (Terraform, CloudFormation)'
      ]
    },
    {
      id: 6,
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹12-18 LPA',
      description: 'Drive product strategy and roadmap for our library management solutions.',
      responsibilities: [
        'Define product vision and strategy',
        'Gather and prioritize product requirements',
        'Work closely with engineering and design teams',
        'Conduct market research and competitive analysis',
        'Track product metrics and user feedback'
      ],
      requirements: [
        'Bachelor\'s degree in Business, Computer Science, or related field',
        '4+ years of product management experience',
        'Strong analytical and problem-solving skills',
        'Experience with agile methodologies',
        'Excellent communication and stakeholder management',
        'Technical background or understanding is preferred'
      ]
    }
  ];

  const toggleJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Careers at LibraTech</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join our team of passionate innovators building the future of library management.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation Culture</h3>
              <p className="text-gray-700">
                Work on cutting-edge technologies and contribute to products that make a real difference.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Opportunities</h3>
              <p className="text-gray-700">
                Access learning resources, mentorship programs, and clear career progression paths.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Work-Life Balance</h3>
              <p className="text-gray-700">
                Enjoy flexible hours, remote work options, and generous vacation policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your perfect role and apply today!
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <button className="ml-4 text-teal-600 hover:text-teal-700">
                      {expandedJob === job.id ? (
                        <ChevronUp className="h-6 w-6" />
                      ) : (
                        <ChevronDown className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedJob === job.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Responsibilities:</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-teal-600 mt-1">•</span>
                              <span className="text-gray-700">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-teal-600 mt-1">•</span>
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <a
                        href="/contact"
                        className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                      >
                        Apply Now
                      </a>
                      <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Share
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-12 border border-teal-200 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't See Your Role?</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="/contact"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors inline-block"
            >
              Send Your Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
