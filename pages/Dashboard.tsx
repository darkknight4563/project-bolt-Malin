import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Calendar,
  BookOpen,
  Users,
  MessageCircle,
  Settings,
  LogOut,
  Activity,
  Sun,
  Moon,
  Cloud,
  Award
} from 'lucide-react';

const moodOptions = [
  { icon: Sun, label: 'Great', color: 'text-yellow-400' },
  { icon: Cloud, label: 'Good', color: 'text-blue-400' },
  { icon: Moon, label: 'Low', color: 'text-indigo-400' }
];

const quickStats = [
  { label: 'Mood Entries', value: '28', icon: Activity, change: '+12%' },
  { label: 'Sessions', value: '15', icon: Calendar, change: '+5%' },
  { label: 'Streak', value: '7', icon: Award, change: '+2 days' },
  { label: 'Community', value: '156', icon: Users, change: '+24' }
];

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900">
      {/* Dashboard Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-medium text-white">
              Welcome back, {currentUser?.email?.split('@')[0]}
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 
                hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-light text-white">{stat.value}</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg">
                  <stat.icon className="w-6 h-6 text-violet-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-400 font-medium">{stat.change}</span>
                <span className="ml-2 text-slate-400">from last week</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Tracker Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Today's Mood</h2>
              <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                View History
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {moodOptions.map((mood) => (
                <motion.button
                  key={mood.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`p-4 rounded-lg border ${
                    selectedMood === mood.label
                      ? 'bg-white/10 border-violet-500'
                      : 'bg-white/5 border-white/10'
                  } hover:bg-white/10 transition-all duration-200`}
                >
                  <mood.icon className={`w-8 h-8 ${mood.color} mx-auto mb-2`} />
                  <p className="text-sm font-medium text-slate-200 text-center">
                    {mood.label}
                  </p>
                </motion.button>
              ))}
            </div>

            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <textarea
                  placeholder="Add a note about how you're feeling..."
                  className="w-full h-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                    text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 
                    focus:ring-violet-500 focus:border-violet-500"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium
                    hover:bg-violet-700 transition-colors"
                >
                  Save Entry
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Quick Actions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-lg font-medium text-white mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 
                  transition-colors group"
              >
                <div className="p-2 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 
                  transition-colors">
                  <BarChart className="w-5 h-5 text-violet-400" />
                </div>
                <span className="ml-3 text-sm font-medium text-slate-200">
                  View Progress Report
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 
                  transition-colors group"
              >
                <div className="p-2 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 
                  transition-colors">
                  <Calendar className="w-5 h-5 text-violet-400" />
                </div>
                <span className="ml-3 text-sm font-medium text-slate-200">
                  Schedule Session
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 
                  transition-colors group"
              >
                <div className="p-2 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 
                  transition-colors">
                  <BookOpen className="w-5 h-5 text-violet-400" />
                </div>
                <span className="ml-3 text-sm font-medium text-slate-200">
                  Browse Resources
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 
                  transition-colors group"
              >
                <div className="p-2 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 
                  transition-colors">
                  <MessageCircle className="w-5 h-5 text-violet-400" />
                </div>
                <span className="ml-3 text-sm font-medium text-slate-200">
                  Join Community Chat
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 
                  transition-colors group"
                onClick={() => navigate('/profile')}
              >
                <div className="p-2 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 
                  transition-colors">
                  <Settings className="w-5 h-5 text-violet-400" />
                </div>
                <span className="ml-3 text-sm font-medium text-slate-200">
                  Profile Settings
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
