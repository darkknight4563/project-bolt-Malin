import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Headphones, FileText, ArrowRight, Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

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

const featuredContent = [
  {
    title: 'Understanding Anxiety',
    type: 'Article',
    duration: '10 min read',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1800',
    color: 'from-violet-500/20 to-indigo-500/20'
  },
  {
    title: 'Mindful Breathing',
    type: 'Video',
    duration: '15 min',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1800',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'Sleep Meditation',
    type: 'Audio',
    duration: '20 min',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&q=80&w=1800',
    color: 'from-amber-500/20 to-orange-500/20'
  }
];

export default function ContentLibrary() {
  return (
    <section id="library" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-display text-2xl sm:text-title text-center text-slate-900 mb-4">
            Rich Content <span className="font-medium">Library</span>
          </h2>
          <p className="text-lg sm:text-body-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Explore our extensive collection of mental wellness resources, from expert articles 
            to guided meditations and practical worksheets.
          </p>
        </AnimatedSection>

        {/* Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
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
            </AnimatedSection>
          ))}
        </div>

        {/* Featured Content */}
        <AnimatedSection delay={0.4}>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-display font-medium text-slate-900">
                Featured Resources
              </h3>
              <button className="text-violet-600 hover:text-violet-700 font-medium text-sm flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredContent.map((content, index) => (
                <motion.div
                  key={index}
                  className="group relative rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Background Image */}
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${content.color} mix-blend-multiply`} />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium text-white bg-white/20 rounded-full">
                        {content.type}
                      </span>
                      <span className="text-xs text-white/80">
                        {content.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-display font-medium text-white mb-2">
                      {content.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-sm font-medium text-white">
                          {content.rating}
                        </span>
                      </div>
                      <span className="text-sm text-white/60">
                        ({content.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>

            {/* Bottom Text */}
            <div className="mt-8 text-center text-sm text-slate-500">
              New content is added regularly to keep you inspired and motivated on your wellness journey.
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}