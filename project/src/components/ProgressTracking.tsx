import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart, Calendar, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const weeklyMoods = [
  { day: 'Mon', value: 80, label: 'Happy' },
  { day: 'Tue', value: 65, label: 'Content' },
  { day: 'Wed', value: 45, label: 'Anxious' },
  { day: 'Thu', value: 70, label: 'Relaxed' },
  { day: 'Fri', value: 85, label: 'Energetic' },
  { day: 'Sat', value: 75, label: 'Peaceful' },
  { day: 'Sun', value: 90, label: 'Joyful' },
];

const activityStats = [
  {
    name: 'Meditation',
    completed: 12,
    total: 15,
    trend: 'up',
    color: 'from-violet-500 to-indigo-500'
  },
  {
    name: 'Journaling',
    completed: 8,
    total: 10,
    trend: 'up',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Exercise',
    completed: 5,
    total: 8,
    trend: 'down',
    color: 'from-rose-500 to-pink-500'
  }
];

export default function ProgressTracking() {
  return (
    <AnimatedSection>
      <div className="bg-white rounded-2xl shadow-xl p-8 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-display font-medium text-slate-900">
            Your Progress
          </h2>
          <div className="flex items-center gap-2">
            <button className="text-sm text-slate-600 hover:text-violet-600 transition-colors">
              Week
            </button>
            <span className="text-slate-300">|</span>
            <button className="text-sm text-violet-600 font-medium">
              Month
            </button>
            <span className="text-slate-300">|</span>
            <button className="text-sm text-slate-600 hover:text-violet-600 transition-colors">
              Year
            </button>
          </div>
        </div>

        {/* Mood Chart */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-slate-900 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-violet-500" />
              Mood Trends
            </h3>
            <button className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 transition-colors">
              <Calendar className="w-4 h-4" />
              Mar 1 - Mar 7
            </button>
          </div>

          <div className="relative h-48">
            <div className="absolute inset-0 flex items-end justify-between">
              {weeklyMoods.map((day, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <motion.div
                    className="w-full max-w-[30px] bg-gradient-to-t from-violet-500 to-indigo-500 rounded-lg relative group"
                    initial={{ height: 0 }}
                    animate={{ height: `${day.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.label}
                    </div>
                  </motion.div>
                  <span className="mt-2 text-sm text-slate-600">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div>
          <h3 className="font-medium text-slate-900 flex items-center gap-2 mb-6">
            <BarChart className="w-5 h-5 text-violet-500" />
            Activity Completion
          </h3>

          <div className="grid gap-4">
            {activityStats.map((activity, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-slate-900">{activity.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">
                      {activity.completed}/{activity.total} completed
                    </span>
                    {activity.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-rose-500" />
                    )}
                  </div>
                </div>
                <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${activity.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(activity.completed / activity.total) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}