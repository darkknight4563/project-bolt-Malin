import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Calendar, Zap, CheckCircle, Smartphone } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const notifications = [
  {
    title: 'Smart Reminders',
    description: 'Get gentle nudges at optimal times based on your activity patterns and preferences.',
    icon: <Bell className="w-6 h-6" />,
    color: 'from-violet-200 to-indigo-300',
    preview: (
      <div className="p-3 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Time for mindfulness</p>
            <p className="text-xs text-slate-500">Your afternoon meditation awaits</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Daily Check-ins',
    description: 'Schedule mood logs at times that work best for you to maintain consistency.',
    icon: <Clock className="w-6 h-6" />,
    color: 'from-emerald-200 to-teal-300',
    preview: (
      <div className="p-3 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Daily mood check</p>
            <p className="text-xs text-slate-500">How are you feeling today?</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Progress Updates',
    description: 'Receive weekly insights and celebrate your mindfulness milestones.',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-amber-200 to-orange-300',
    preview: (
      <div className="p-3 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Weekly Progress</p>
            <p className="text-xs text-slate-500">You've completed 5 sessions!</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function StayOnTrack() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-title text-slate-900">
              Stay on <span className="font-medium">Track</span>
            </h2>
          </div>
          <p className="text-lg sm:text-body-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Never miss a mindfulness session with personalized notifications that adapt to your schedule 
            and help you maintain your wellness routine.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {notifications.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-display text-lg font-medium text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 mb-6">
                  {item.description}
                </p>

                {/* Notification Preview */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {item.preview}
                </motion.div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile App Preview */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-8">
              <Smartphone className="w-4 h-4" />
              Available on iOS & Android
            </div>
            <div className="max-w-md mx-auto bg-gradient-to-b from-violet-100 to-slate-50 rounded-3xl p-8">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1800"
                alt="Mobile app preview"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}