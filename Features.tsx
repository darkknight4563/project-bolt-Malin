import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Brain, Smile, Users, Target, Clock, Leaf } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-violet-600" />,
    title: "AI-Powered Insights",
    description: "Get personalized recommendations and insights based on your unique mental health journey.",
    stat: "93%",
    statLabel: "User satisfaction"
  },
  {
    icon: <Brain className="w-8 h-8 text-violet-600" />,
    title: "Guided Meditation",
    description: "Access a vast library of meditation sessions led by experienced practitioners.",
    stat: "1000+",
    statLabel: "Meditation sessions"
  },
  {
    icon: <Shield className="w-8 h-8 text-violet-600" />,
    title: "Safe Space",
    description: "A confidential environment where you can express yourself freely and securely.",
    stat: "100%",
    statLabel: "Privacy guaranteed"
  },
  {
    icon: <Smile className="w-8 h-8 text-violet-600" />,
    title: "Mood Tracking",
    description: "Track your emotional well-being with our intuitive mood tracking tools.",
    stat: "Daily",
    statLabel: "Progress tracking"
  },
  {
    icon: <Users className="w-8 h-8 text-violet-600" />,
    title: "Community Support",
    description: "Connect with others on similar journeys in our supportive community.",
    stat: "50K+",
    statLabel: "Active members"
  },
  {
    icon: <Heart className="w-8 h-8 text-violet-600" />,
    title: "Expert Guidance",
    description: "Access to certified therapists and mental health professionals.",
    stat: "24/7",
    statLabel: "Support available"
  }
];

export default function Features() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-violet-50/30" />
      <div className="absolute right-0 top-1/4 w-1/3 aspect-square bg-gradient-to-br from-violet-100/40 to-transparent rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-1/3 aspect-square bg-gradient-to-tr from-violet-100/40 to-transparent rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-violet-100 text-violet-700 font-medium text-sm mb-4"
            >
              Why Choose Malin
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-900 mb-6"
            >
              Your Complete Mental Wellness Solution
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600"
            >
              Experience a comprehensive suite of tools and resources designed to support 
              your mental health journey, all in one place.
            </motion.p>
          </div>
        </AnimatedSection>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="relative p-8 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-100/50
                  hover:shadow-xl hover:shadow-violet-100/50 hover:border-violet-100 transition-all duration-300"
              >
                <div className="absolute -top-4 right-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r 
                    from-violet-600 to-indigo-600 text-white text-sm font-medium">
                    {feature.stat}
                  </div>
                </div>

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl 
                  bg-gradient-to-br from-violet-50 to-indigo-50 mb-6">
                  {feature.icon}
                </div>

                <h3 className="font-display text-xl font-medium text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <div className="text-sm text-violet-600 font-medium">
                  {feature.statLabel}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to action */}
        <AnimatedSection delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <button className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r 
              from-violet-600 to-indigo-600 text-white font-medium hover:shadow-lg 
              hover:shadow-violet-500/20 transition-all duration-300">
              Start Your Journey
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}