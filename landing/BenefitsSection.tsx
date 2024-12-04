import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Reduce Stress & Anxiety',
    description: 'Learn techniques to manage stress and reduce anxiety through guided practices.',
    stat: '78%',
    statLabel: 'of users report reduced anxiety'
  },
  {
    title: 'Improve Sleep Quality',
    description: 'Develop better sleep habits with our specialized nighttime meditations.',
    stat: '85%',
    statLabel: 'sleep better within 2 weeks'
  },
  {
    title: 'Enhance Focus',
    description: 'Boost your concentration and productivity with mindfulness exercises.',
    stat: '92%',
    statLabel: 'report improved focus'
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-violet-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Transform Your Mental Well-being
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of users who have experienced positive changes in their lives
            through regular use of Malin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-8 rounded-2xl bg-white shadow-xl"
            >
              <div className="absolute -top-6 left-8">
                <div className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-2xl">
                  {benefit.stat}
                </div>
              </div>
              
              <div className="pt-8">
                <p className="text-sm text-violet-600 font-medium mb-6">
                  {benefit.statLabel}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-200 to-indigo-200 border-2 border-white"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    Join {Math.floor(Math.random() * 100 + 400)} others today
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
