import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Sun, Moon, Heart, Activity, Calendar, Edit } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ProgressTracking from '../components/ProgressTracking';

const moodEmojis = [
  { icon: <Smile className="w-6 h-6" />, label: 'Happy', value: 5 },
  { icon: <Sun className="w-6 h-6" />, label: 'Energetic', value: 4 },
  { icon: <Heart className="w-6 h-6" />, label: 'Content', value: 3 },
  { icon: <Meh className="w-6 h-6" />, label: 'Neutral', value: 2 },
  { icon: <Frown className="w-6 h-6" />, label: 'Sad', value: 1 },
];

const activities = [
  'Exercise', 'Meditation', 'Good Sleep', 'Healthy Eating',
  'Social Activity', 'Work', 'Relaxation', 'Nature Time'
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle mood submission
    console.log({
      mood: selectedMood,
      note: moodNote,
      activities: selectedActivities,
      timestamp: new Date()
    });
  };

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
            Track Your <span className="font-medium">Mood</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            Log your daily moods and activities to gain insights into your emotional well-being.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              {/* Current Date */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display font-medium text-slate-900">
                  How are you feeling?
                </h2>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date().toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>

              {/* Mood Selection */}
              <div className="grid grid-cols-5 gap-4 mb-8">
                {moodEmojis.map((mood, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      selectedMood === mood.value
                        ? 'bg-violet-50 border-2 border-violet-500'
                        : 'bg-slate-50 border-2 border-transparent hover:border-violet-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`${
                      selectedMood === mood.value ? 'text-violet-600' : 'text-slate-600'
                    }`}>
                      {mood.icon}
                    </div>
                    <span className={`text-sm font-medium ${
                      selectedMood === mood.value ? 'text-violet-600' : 'text-slate-600'
                    }`}>
                      {mood.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Activities */}
              <div className="mb-8">
                <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-violet-500" />
                  What have you been up to?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {activities.map((activity, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleActivityToggle(activity)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedActivities.includes(activity)
                          ? 'bg-violet-100 text-violet-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activity}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-8">
                <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-violet-500" />
                  Add a note
                </h3>
                <textarea
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="How are you feeling? What's on your mind?"
                  className="w-full h-32 px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 
                    focus:border-violet-500 focus:ring-0 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
                  px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Log Your Mood
              </motion.button>
            </form>
          </AnimatedSection>

          {/* Progress Tracking Section */}
          <ProgressTracking />
        </div>
      </div>
    </div>
  );
}