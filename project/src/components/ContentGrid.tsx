import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Flower2, HeartHandshake, BookOpen } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const gridItems = [
  {
    title: 'Mood Tracker',
    description: 'Track your emotional journey with our intuitive mood tracking tools',
    icon: <LineChart className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1800',
    color: 'from-rose-500 to-orange-500'
  },
  {
    title: 'Mindfulness Exercises',
    description: 'Guided meditation and breathing exercises for inner peace',
    icon: <Flower2 className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1800',
    color: 'from-blue-500 to-violet-500'
  },
  {
    title: 'Daily Gratitude',
    description: 'Cultivate positivity through daily gratitude practices',
    icon: <HeartHandshake className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1602525962574-3bc829fbed3c?auto=format&fit=crop&q=80&w=1800',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Therapy Resources',
    description: 'Access professional resources and guided self-help materials',
    icon: <BookOpen className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1800',
    color: 'from-violet-500 to-purple-500'
  }
];

export default function ContentGrid() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-display text-2xl sm:text-title text-center text-slate-900 mb-4 sm:mb-6">
            Comprehensive <span className="font-medium">Wellness Tools</span>
          </h2>
          <p className="text-lg sm:text-body-lg text-slate-600 text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
            Discover our suite of mental wellness tools designed to support your journey 
            towards better mental health and emotional well-being.
          </p>
        </AnimatedSection>
        
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {gridItems.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm 
                  hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 
                      transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br bg-opacity-60 
                    group-hover:bg-opacity-70 transition-all duration-500 flex items-center 
                    justify-center opacity-0 group-hover:opacity-100">
                    <motion.div 
                      className={`bg-gradient-to-r ${item.color} p-3 sm:p-4 rounded-full 
                        text-white shadow-lg`}
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-lg sm:text-xl font-medium text-slate-900 mb-2 sm:mb-3 
                    group-hover:text-violet-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
                
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                  ${item.color}`}></div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}