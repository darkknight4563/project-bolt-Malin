import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Evidence-Based Approach",
    description: "Our methods are grounded in scientific research and proven therapeutic techniques."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Personalized Care",
    description: "Every journey is unique. We tailor our support to meet your individual needs and goals."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Therapists",
    description: "Our team consists of licensed professionals with extensive experience in mental health care."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safe Space",
    description: "We provide a confidential, judgment-free environment for your healing journey."
  }
];

const methodologies = [
  {
    title: "Cognitive Behavioral Therapy",
    description: "A structured approach that helps identify and change negative thought patterns.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1800"
  },
  {
    title: "Mindfulness Practices",
    description: "Techniques to stay present and develop greater awareness of thoughts and emotions.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1800"
  },
  {
    title: "Holistic Wellness",
    description: "Addressing mental health through the lens of overall well-being and lifestyle.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1800"
  }
];

export default function LearnMore() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-violet-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6"
          >
            Our <span className="font-medium">Approach</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            Discover how we combine evidence-based practices with personalized care 
            to support your mental health journey.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-medium text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-display text-2xl sm:text-3xl text-center text-slate-900 mb-16">
              Our <span className="font-medium">Methodologies</span>
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {methodologies.map((method, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={method.image}
                      alt={method.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-medium text-slate-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {method.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="font-display text-2xl sm:text-3xl text-slate-900 mb-6">
                Ready to Begin Your <span className="font-medium">Journey</span>?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Take the first step towards better mental health. Our team is here to 
                support you every step of the way.
              </p>
              <Link
                to="/get-started"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 
                  to-indigo-600 text-white font-medium rounded-full hover:shadow-lg 
                  transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}