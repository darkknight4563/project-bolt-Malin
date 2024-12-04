import React from 'react';
import { motion } from 'framer-motion';
import { Book, Video, Headphones, FileText } from 'lucide-react';

const categories = [
  {
    icon: <Book className="w-6 h-6" />,
    title: "Reading Materials",
    description: "Articles, guides, and research papers on mental wellness.",
    count: "200+ articles"
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Video Content",
    description: "Guided meditation sessions and expert interviews.",
    count: "100+ videos"
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Audio Sessions",
    description: "Meditation tracks and calming soundscapes.",
    count: "300+ tracks"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Worksheets",
    description: "Interactive exercises and self-reflection tools.",
    count: "50+ worksheets"
  }
];

export default function Library() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6"
          >
            Content <span className="font-medium">Library</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            Explore our comprehensive collection of mental wellness resources, 
            from guided meditations to expert articles.
          </motion.p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 
                  hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-violet-400 mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-slate-300 mb-4">
                  {category.description}
                </p>
                <div className="text-sm text-violet-400 font-medium">
                  {category.count}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4">
              Featured Content
            </h2>
            <p className="text-slate-300">
              Hand-picked resources to get you started on your wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="rounded-2xl overflow-hidden bg-gradient-to-br from-violet-900/50 to-indigo-900/50 
                  backdrop-blur-lg border border-white/10"
              >
                <div className="aspect-video bg-violet-900/30" />
                <div className="p-6">
                  <div className="text-sm text-violet-400 font-medium mb-2">
                    Featured Article
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    Understanding Mindfulness
                  </h3>
                  <p className="text-slate-300">
                    Learn the fundamentals of mindfulness and how it can improve your daily life.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
