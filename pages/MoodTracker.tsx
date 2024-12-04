import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Smile,
  Meh,
  Frown,
  Activity,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import MoodAnalytics from '../components/MoodAnalytics';

interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad';
  energy: number;
  notes: string;
  activities: string[];
  timestamp: Date;
  userId: string;
}

const activities = [
  'Exercise',
  'Work',
  'Social',
  'Family',
  'Hobbies',
  'Rest',
  'Study',
  'Entertainment',
  'Nature',
  'Travel',
];

export default function MoodTracker() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { action } = useParams();
  
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [energy, setEnergy] = useState(5);
  const [notes, setNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    if (currentUser) {
      loadRecentMoods();
    }
  }, [currentUser]);

  const loadRecentMoods = async () => {
    try {
      const moodsRef = collection(db, 'moods');
      const q = query(
        moodsRef,
        where('userId', '==', currentUser?.uid),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const moods: MoodEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        moods.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate(),
        } as MoodEntry);
      });

      setRecentMoods(moods);
    } catch (error) {
      console.error('Error loading moods:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mood) {
      setError('Please select your mood');
      return;
    }

    if (!currentUser) {
      setError('You must be logged in to track your mood');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const moodEntry: Omit<MoodEntry, 'id'> = {
        mood,
        energy,
        notes,
        activities: selectedActivities,
        timestamp: new Date(),
        userId: currentUser.uid,
      };

      const newMoodRef = doc(collection(db, 'moods'));
      await setDoc(newMoodRef, moodEntry);

      setSuccess(true);
      await loadRecentMoods();

      // Reset form after 2 seconds
      setTimeout(() => {
        setMood(null);
        setEnergy(5);
        setNotes('');
        setSelectedActivities([]);
        setSuccess(false);
      }, 2000);

    } catch (error) {
      setError('Failed to save mood entry');
      console.error('Error saving mood:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Analytics Section */}
        <div className="mb-12">
          <MoodAnalytics moodEntries={recentMoods} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mood Entry Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow p-6">
            <h2 className="text-2xl font-light text-white mb-6">How are you feeling?</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-900/30 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-sm text-red-400">{error}</span>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-900/20 border border-green-900/30 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm text-green-400">Mood tracked successfully!</span>
                </div>
              )}

              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-3">
                  Select your mood
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'happy', icon: Smile, label: 'Happy' },
                    { value: 'neutral', icon: Meh, label: 'Neutral' },
                    { value: 'sad', icon: Frown, label: 'Sad' },
                  ].map(({ value, icon: Icon, label }) => (
                    <motion.button
                      key={value}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMood(value as 'happy' | 'neutral' | 'sad')}
                      className={`p-4 rounded-lg border ${
                        mood === value
                          ? 'bg-violet-500/20 border-violet-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      } transition-colors`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        mood === value ? 'text-violet-400' : 'text-slate-400'
                      }`} />
                      <span className={`block text-sm ${
                        mood === value ? 'text-violet-400' : 'text-slate-400'
                      }`}>
                        {label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Energy Level */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-3">
                  Energy Level: {energy}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                    [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-violet-500 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Activities */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-3">
                  What have you been doing?
                </label>
                <div className="flex flex-wrap gap-2">
                  {activities.map((activity) => (
                    <motion.button
                      key={activity}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleActivity(activity)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedActivities.includes(activity)
                          ? 'bg-violet-500/20 text-violet-400 border border-violet-500'
                          : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                      } transition-colors`}
                    >
                      {activity}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-200 mb-3">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling? What's on your mind?"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                    text-white placeholder-slate-500 focus:ring-2 focus:ring-violet-500
                    focus:border-violet-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-violet-600
                  rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2
                  focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50
                  disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Track Mood'}
              </motion.button>
            </form>
          </div>

          {/* Recent Moods */}
          <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow p-6">
            <h2 className="text-2xl font-light text-white mb-6">Recent Moods</h2>
            
            <div className="space-y-4">
              {recentMoods.length === 0 ? (
                <p className="text-slate-400 text-sm">No mood entries yet</p>
              ) : (
                recentMoods.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {entry.mood === 'happy' && <Smile className="w-5 h-5 text-green-400" />}
                        {entry.mood === 'neutral' && <Meh className="w-5 h-5 text-amber-400" />}
                        {entry.mood === 'sad' && <Frown className="w-5 h-5 text-red-400" />}
                        <Activity className="w-4 h-4 text-slate-400 ml-3 mr-1" />
                        <span className="text-sm text-slate-400">{entry.energy}/10</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {entry.activities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {entry.activities.map((activity) => (
                          <span
                            key={activity}
                            className="px-2 py-0.5 text-xs rounded-full bg-white/5
                              text-slate-400 border border-white/10"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {entry.notes && (
                      <p className="text-sm text-slate-400 mt-2">{entry.notes}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}