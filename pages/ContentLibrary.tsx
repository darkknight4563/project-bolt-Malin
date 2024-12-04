import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Headphones, FileText, ArrowRight, Star, Search, Filter } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const categories = [
  {
    name: 'Articles',
    icon: <BookOpen className="w-6 h-6" />,
    count: 45,
    color: 'from-violet-500 to-indigo-500'
  },
  {
    name: 'Videos',
    icon: <Video className="w-6 h-6" />,
    count: 32,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Audio Guides',
    icon: <Headphones className="w-6 h-6" />,
    count: 28,
    color: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Worksheets',
    icon: <FileText className="w-6 h-6" />,
    count: 15,
    color: 'from-rose-500 to-pink-500'
  }
];

const resources = [
  {
    title: 'Understanding Anxiety',
    type: 'Article',
    duration: '10 min read',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1800',
    description: 'Learn about the causes, symptoms, and management techniques for anxiety.',
    tags: ['Mental Health', 'Anxiety', 'Self-Help']
  },
  {
    title: 'Mindful Breathing',
    type: 'Video',
    duration: '15 min',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1800',
    description: 'A guided session for deep breathing exercises to reduce stress.',
    tags: ['Meditation', 'Breathing', 'Stress Relief']
  },
  {
    title: 'Sleep Meditation',
    type: 'Audio',
    duration: '20 min',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&q=80&w=1800',
    description: 'Calming meditation to help you fall asleep naturally.',
    tags: ['Sleep', 'Meditation', 'Relaxation']
  },
  {
    title: 'Daily Mood Journal',
    type: 'Worksheet',
    duration: '5 min',
    rating: 4.6,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?auto=format&fit=crop&q=80&w=1800',
    description: 'Track your daily emotions and identify patterns.',
    tags: ['Journaling', 'Self-Reflection', 'Mental Health']
  }
];

export default function ContentLibrary() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-violet-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 text-center"
          >
            Content <span className="font-medium">Library</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto text-center mb-8"
          >
            Explore our curated collection of mental wellness resources, from expert articles 
            to guided meditations and practical worksheets.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                focus:ring-violet-500 focus:border-transparent"
            />
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Categories */}
        <AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} 
                  flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-display text-lg font-medium text-slate-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-slate-600">
                  {category.count} resources
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-display font-medium text-slate-900">
              All Resources
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-violet-600 
              transition-colors">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </AnimatedSection>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 
                  overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 
                      transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2 py-1 text-xs font-medium text-white bg-white/20 
                      backdrop-blur-sm rounded-full">
                      {resource.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-lg font-medium text-slate-900">
                      {resource.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-medium text-slate-900">{resource.rating}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-4">{resource.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-medium text-violet-600 bg-violet-50 
                          rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{resource.duration}</span>
                    <button className="text-violet-600 hover:text-violet-700 font-medium text-sm 
                      flex items-center gap-1">
                      Access Resource
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}