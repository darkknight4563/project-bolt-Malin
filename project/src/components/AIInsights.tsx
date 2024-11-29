import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, LineChart, Target } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const insights = [
  {
    title: 'Mood Pattern Analysis',
    description: 'Our AI analyzes your mood patterns to identify triggers and suggest personalized coping strategies.',
    icon: <LineChart className="w-6 h-6" />,
    color: 'from-blue-200 to-blue-300',
    delay: 0.1
  },
  {
    title: 'Smart Recommendations',
    description: 'Get personalized mindfulness exercises and activities based on your emotional state.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-violet-200 to-violet-300',
    delay: 0.2
  },
  {
    title: 'Progress Tracking',
    description: 'AI-powered insights help you visualize your wellness journey and celebrate improvements.',
    icon: <Target className="w-6 h-6" />,
    color: 'from-emerald-200 to-emerald-300',
    delay: 0.3
  }
];

const moodData = [
  { day: 'Mon', joy: 0.8, anxiety: 0.3, energy: 0.6 },
  { day: 'Tue', joy: 0.6, anxiety: 0.5, energy: 0.4 },
  { day: 'Wed', joy: 0.4, anxiety: 0.7, energy: 0.3 },
  { day: 'Thu', joy: 0.7, anxiety: 0.4, energy: 0.5 },
  { day: 'Fri', joy: 0.9, anxiety: 0.2, energy: 0.8 },
  { day: 'Sat', joy: 0.8, anxiety: 0.3, energy: 0.7 },
  { day: 'Sun', joy: 0.7, anxiety: 0.4, energy: 0.6 }
];

export default function AIInsights() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white">
              <Brain className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-title text-slate-900">
              AI-Powered <span className="font-medium">Insights</span>
            </h2>
          </div>
          <p className="text-lg sm:text-body-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Our advanced AI technology analyzes your data to provide personalized recommendations 
            and actionable insights for your mental wellness journey.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {insights.map((insight, index) => (
            <AnimatedSection key={index} delay={insight.delay}>
              <motion.div
                className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${insight.color} flex items-center justify-center`}>
                    {insight.icon}
                  </div>
                </div>
                <h3 className="font-display text-lg font-medium text-slate-900 mb-3">
                  {insight.title}
                </h3>
                <p className="text-slate-600">
                  {insight.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Enhanced Visualization */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
            <div className="mb-8">
              <h3 className="text-xl font-display font-medium text-slate-900 mb-2">
                Your Emotional Patterns
              </h3>
              <p className="text-slate-600">
                Weekly mood analysis showing the relationship between different emotional states
              </p>
            </div>

            <div className="relative h-80">
              {/* Background Grid */}
              <div className="absolute inset-0 grid grid-cols-7 gap-4">
                {moodData.map((_, i) => (
                  <div key={i} className="border-r border-slate-100 last:border-r-0" />
                ))}
              </div>

              {/* Data Visualization */}
              <div className="absolute inset-0 flex items-end">
                {moodData.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end space-y-2">
                    {/* Joy Bar */}
                    <motion.div
                      className="w-4 bg-gradient-to-t from-violet-500 to-violet-300 rounded-full"
                      initial={{ height: 0 }}
                      animate={{ height: `${day.joy * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                    {/* Energy Bar */}
                    <motion.div
                      className="w-4 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-full"
                      initial={{ height: 0 }}
                      animate={{ height: `${day.energy * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                    />
                    {/* Anxiety Bar */}
                    <motion.div
                      className="w-4 bg-gradient-to-t from-rose-500 to-rose-300 rounded-full"
                      initial={{ height: 0 }}
                      animate={{ height: `${day.anxiety * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.4 }}
                    />
                    <span className="text-sm text-slate-600 mt-2">{day.day}</span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute top-4 right-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-t from-violet-500 to-violet-300" />
                  <span className="text-sm text-slate-600">Joy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-t from-emerald-500 to-emerald-300" />
                  <span className="text-sm text-slate-600">Energy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-t from-rose-500 to-rose-300" />
                  <span className="text-sm text-slate-600">Anxiety</span>
                </div>
              </div>
            </div>

            {/* Insights Panel */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-sm text-slate-600 mb-1">Weekly Joy Average</div>
                <div className="text-2xl font-medium text-violet-600">78%</div>
                <div className="text-sm text-emerald-600">↑ 12% from last week</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-sm text-slate-600 mb-1">Energy Levels</div>
                <div className="text-2xl font-medium text-emerald-600">65%</div>
                <div className="text-sm text-emerald-600">↑ 8% from last week</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-sm text-slate-600 mb-1">Anxiety Reduction</div>
                <div className="text-2xl font-medium text-rose-600">-25%</div>
                <div className="text-sm text-emerald-600">Improved from last week</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}