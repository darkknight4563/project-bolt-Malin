import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Shield, Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const values = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Inclusive Care",
    description: "We believe in providing mental health support that's accessible and welcoming to everyone, regardless of their background."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Compassionate Approach",
    description: "Our team approaches every interaction with empathy, understanding, and genuine care for your well-being."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safe Environment",
    description: "We maintain the highest standards of confidentiality and create a secure space for your healing journey."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Professional Excellence",
    description: "Our therapists are highly qualified professionals committed to continuous learning and improvement."
  }
];

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-violet-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6"
          >
            About <span className="font-medium">Malin</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            We're dedicated to making mental health care accessible, compassionate, and effective 
            for everyone who needs it.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-display text-2xl sm:text-3xl text-center text-slate-900 mb-16">
              Our Core <span className="font-medium">Values</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-display text-lg font-medium text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="font-display text-2xl sm:text-3xl text-slate-900 mb-6">
                Our <span className="font-medium">Mission</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                To provide accessible, high-quality mental health care that empowers individuals 
                to live fuller, healthier lives. We believe everyone deserves support on their 
                journey to mental wellness.
              </p>
              <img
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2070"
                alt="Team meeting"
                className="rounded-2xl shadow-xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}