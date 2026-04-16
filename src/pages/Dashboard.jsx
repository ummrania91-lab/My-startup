import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import LoadingState from '../components/LoadingState';
import { fetchCourses } from '../services/api';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-sb-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sb-purple/20 via-sb-dark to-sb-green/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-sb-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sb-green/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sb-purple/15 border border-sb-purple/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-sb-green animate-pulse" />
              <span className="text-xs font-medium text-sb-purple">AI-Powered Learning</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Learn Anything in{' '}
              <span className="bg-gradient-to-r from-sb-green via-sb-purple to-sb-orange bg-clip-text text-transparent">
                5 Minutes
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
              AI-generated micro-lessons that adapt to your pace. Bite-sized knowledge,
              zero overwhelm. Built for the way you actually learn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 bg-sb-purple hover:bg-sb-purple/80 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-sb-purple/25 hover:-translate-y-0.5"
              >
                Explore Courses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button className="inline-flex items-center justify-center gap-2 border border-sb-gray hover:border-sb-purple/50 text-gray-300 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-sb-gray/50">
              {[
                { value: '500+', label: 'Micro-Lessons' },
                { value: '50K+', label: 'Active Learners' },
                { value: '4.9', label: 'Avg Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-sb-green">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Trending Courses
            </h2>
            <p className="text-gray-500 text-sm mt-1">Hand-picked for curious minds</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
            <span>Scroll</span>
            <svg className="w-4 h-4 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading courses..." />
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
            {courses.map((course) => (
              <div key={course.id} className="snap-start">
                <CourseCard
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  image={course.image}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Pick a Topic',
              desc: 'Browse hundreds of micro-courses across tech, design, and more.',
              color: 'sb-purple',
            },
            {
              step: '02',
              title: 'Learn in 5 Min',
              desc: 'AI generates bite-sized lessons tailored to your learning speed.',
              color: 'sb-green',
            },
            {
              step: '03',
              title: 'Test Yourself',
              desc: 'Quick quizzes reinforce what you learned and track your progress.',
              color: 'sb-orange',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-sb-gray/30 border border-sb-gray/50 rounded-2xl p-6 hover:border-sb-purple/30 transition-all duration-300"
            >
              <span className={`text-4xl font-bold text-${item.color}/30 font-heading`}>
                {item.step}
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-3 mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}  
