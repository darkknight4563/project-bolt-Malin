import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Target, Brain, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const activities = [
  {
    title: "Morning Meditation",
    time: "8:00 AM",
    duration: "15 min",
    type: "Mindfulness",
    icon: <Brain className="w-5 h-5" />,
    color: "bg-violet-100 text-violet-600"
  },
  {
    title: "Stress Relief Exercise",
    time: "12:00 PM",
    duration: "20 min",
    type: "Exercise",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-rose-100 text-rose-600"
  },
  {
    title: "Evening Reflection",
    time: "8:00 PM",
    duration: "10 min",
    type: "Journaling",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "bg-emerald-100 text-emerald-600"
  }
];

const goals = [
  "Reduce anxiety through regular mindfulness practice",
  "Improve sleep quality with evening relaxation routines",
  "Build emotional resilience through daily reflection",
  "Develop better stress management techniques"
];

export default function WellnessPlan() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-violet-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6"
          >
            Your Wellness <span className="font-medium">Plan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            A personalized journey designed to help you achieve your mental wellness goals.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Daily Schedule */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-medium text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-violet-500" />
                Daily Schedule
              </h2>

              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50"
                  >
                    <div className={`w-12 h-12 rounded-xl ${activity.color} flex items-center justify-center`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">{activity.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {activity.time}
                        </span>
                        <span>•</span>
                        <span>{activity.duration}</span>
                        <span>•</span>
                        <span>{activity.type}</span>
                      </div>
                    </div>
                    <button className="text-violet-600 hover:text-violet-700">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Goals */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="font-display text-2xl font-medium text-slate-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-violet-500" />
                Your Goals
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50"
                  >
                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-violet-600" />
                    </div>
                    <p className="text-slate-600">{goal}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-violet-50 rounded-xl">
                <p className="text-sm text-violet-700 text-center">
                  Your plan will adapt as you progress and provide new challenges to help you grow.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}