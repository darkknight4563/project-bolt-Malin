import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Calendar, Heart, ArrowRight, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const upcomingEvents = [
  {
    title: 'Group Meditation Session',
    date: 'Tomorrow, 10:00 AM',
    participants: 24,
    type: 'Virtual'
  },
  {
    title: 'Anxiety Support Group',
    date: 'Wed, 2:00 PM',
    participants: 15,
    type: 'Virtual'
  },
  {
    title: 'Mindfulness Workshop',
    date: 'Sat, 11:00 AM',
    participants: 32,
    type: 'Virtual'
  }
];

const discussionTopics = [
  {
    title: 'Managing Work Stress',
    replies: 45,
    lastActive: '2h ago',
    tags: ['Stress', 'Work-Life']
  },
  {
    title: 'Daily Meditation Tips',
    replies: 67,
    lastActive: '1h ago',
    tags: ['Meditation', 'Tips']
  },
  {
    title: 'Sleep Improvement Strategies',
    replies: 38,
    lastActive: '30m ago',
    tags: ['Sleep', 'Wellness']
  }
];

export default function Community() {
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
            Join Our <span className="font-medium">Community</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            Connect with others on their wellness journey, share experiences, and participate 
            in virtual mindfulness sessions.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-violet-500" />
                  Upcoming Events
                </h2>
                <button className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-violet-50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900">{event.title}</h3>
                      <span className="px-2 py-1 text-xs font-medium text-violet-600 bg-violet-100 rounded-full">
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{event.date}</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.participants} joined
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Discussion Forums */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-medium text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-violet-500" />
                  Popular Discussions
                </h2>
                <button className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {discussionTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-violet-50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <h3 className="font-medium text-slate-900 mb-2">{topic.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {topic.replies} replies
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {topic.lastActive}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {topic.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-medium text-violet-600 bg-violet-100 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Join CTA */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl p-8 text-white">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-medium mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-white/80 mb-6">
                Connect with others, share your journey, and grow together in a supportive environment.
              </p>
              <button className="bg-white text-violet-600 px-6 py-3 rounded-lg font-medium hover:bg-violet-50 transition-colors">
                Join Now
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}