import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-violet-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-200/40 to-indigo-200/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-violet-200/40 to-indigo-200/40 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-4 px-4 py-1 rounded-full bg-violet-100 text-violet-700 font-medium text-sm">
                Your Journey to Mental Wellness Starts Here
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Find Peace of Mind with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                  Malin
                </span>
              </h1>

              <p className="text-lg text-slate-600 mb-8">
                Experience guided meditation, mood tracking, and professional support - all in one place.
                Start your journey to better mental health today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/20 transition-all">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-800 font-medium hover:border-violet-200 hover:shadow-lg hover:shadow-slate-100/50 transition-all">
                  Learn More
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free for 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-lg text-slate-600">
              Discover powerful tools designed to support your mental health journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Guided Meditation',
                description: 'Access a library of meditations for different needs and experience levels'
              },
              {
                title: 'Mood Tracking',
                description: 'Track your emotional well-being and identify patterns'
              },
              {
                title: 'Professional Support',
                description: 'Connect with licensed therapists when you need guidance'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-violet-200 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-violet-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-slate-600">
              Join our community of users who have transformed their mental well-being
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Malin has helped me develop a consistent meditation practice. I feel more calm and focused.",
                author: "Sarah K.",
                role: "User for 6 months"
              },
              {
                quote: "The mood tracking feature has been eye-opening. I understand my patterns so much better now.",
                author: "Michael R.",
                role: "User for 3 months"
              },
              {
                quote: "Having access to professional support when I need it gives me peace of mind.",
                author: "Emma T.",
                role: "User for 1 year"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 rounded-2xl bg-white shadow-xl"
              >
                <p className="text-slate-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Mental Wellness Journey Today
          </h2>
          <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already transformed their lives with Malin.
            Try it free for 7 days.
          </p>
          <button className="px-8 py-4 rounded-xl bg-white text-violet-600 font-medium hover:shadow-lg transition-all">
            Get Started Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
