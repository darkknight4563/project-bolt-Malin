import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Wind, Brain, Heart } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const exercises = [
  {
    title: 'Breathing Techniques',
    description: 'Guided breathing exercises to help reduce stress and anxiety, from basic techniques to advanced practices.',
    icon: <Wind className="w-6 h-6" />,
    color: 'from-sky-200 to-blue-300',
    delay: 0.1
  },
  {
    title: 'Meditation Sessions',
    description: 'Personalized meditation sessions that adapt to your experience level and specific needs.',
    icon: <Flower2 className="w-6 h-6" />,
    color: 'from-violet-200 to-purple-300',
    delay: 0.2
  },
  {
    title: 'Mindful Movement',
    description: 'Gentle movement practices that combine physical awareness with mental clarity.',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-emerald-200 to-teal-300',
    delay: 0.3
  }
];

const categories = [
  {
    name: 'Beginner',
    exercises: ['Deep Breathing', 'Body Scan', 'Walking Meditation'],
    color: 'bg-emerald-100 text-emerald-700'
  },
  {
    name: 'Intermediate',
    exercises: ['Loving-Kindness', 'Mindful Eating', 'Sound Meditation'],
    color: 'bg-violet-100 text-violet-700'
  },
  {
    name: 'Advanced',
    exercises: ['Transcendental', 'Vipassana', 'Zen Practice'],
    color: 'bg-blue-100 text-blue-700'
  }
];

export default function MindfulnessExercises() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-title text-slate-900">
              Tailored <span className="font-medium">Mindfulness</span>
            </h2>
          </div>
          <p className="text-lg sm:text-body-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Discover our comprehensive library of mindfulness exercises, personalized to your journey 
            and designed to enhance your mental well-being.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {exercises.map((exercise, index) => (
            <AnimatedSection key={index} delay={exercise.delay}>
              <motion.div
                className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${exercise.color} flex items-center justify-center`}>
                    {exercise.icon}
                  </div>
                </div>
                <h3 className="font-display text-lg font-medium text-slate-900 mb-3">
                  {exercise.title}
                </h3>
                <p className="text-slate-600">
                  {exercise.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50/50 to-transparent rounded-tr-2xl -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-slate-50/50 to-transparent rounded-bl-2xl -z-10" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Exercise Categories */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-display font-medium text-slate-900 mb-6 text-center">
              Exercise Library
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-50 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${category.color}`}>
                    {category.name}
                  </div>
                  <ul className="space-y-3">
                    {category.exercises.map((exercise, i) => (
                      <li key={i} className="flex items-center text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2" />
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Our library continuously grows with your practice, offering new exercises 
                as you progress in your mindfulness journey.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}