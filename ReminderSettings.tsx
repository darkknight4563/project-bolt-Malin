import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Settings,
  Share2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import ReminderTemplates from './ReminderTemplates';
import SharedTemplates from './SharedTemplates';

interface Reminder {
  id: string;
  time: string;
  days: string[];
  enabled: boolean;
  message?: string;
}

interface ReminderSettings {
  enabled: boolean;
  reminders: Reminder[];
  notificationMethod: 'browser' | 'email' | 'both';
}

const defaultReminder: Reminder = {
  id: crypto.randomUUID(),
  time: '09:00',
  days: ['Mon', 'Wed', 'Fri'],
  enabled: true,
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ReminderSettings() {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState<ReminderSettings>({
    enabled: false,
    reminders: [defaultReminder],
    notificationMethod: 'browser',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'community'>('personal');

  useEffect(() => {
    loadSettings();
  }, [currentUser]);

  const loadSettings = async () => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists() && docSnap.data().reminderSettings) {
        setSettings(docSnap.data().reminderSettings);
      }
    } catch (error) {
      console.error('Error loading reminder settings:', error);
    }
  };

  const saveSettings = async () => {
    if (!currentUser) return;

    try {
      setError('');
      setLoading(true);

      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        reminderSettings: settings,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      // Register or update browser notifications if enabled
      if (settings.enabled && 
          (settings.notificationMethod === 'browser' || 
           settings.notificationMethod === 'both')) {
        requestNotificationPermission();
      }
    } catch (error) {
      setError('Failed to save reminder settings');
      console.error('Error saving reminder settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      setError('This browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setError('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setError('Failed to enable notifications');
    }
  };

  const addReminder = () => {
    setSettings(prev => ({
      ...prev,
      reminders: [...prev.reminders, {
        ...defaultReminder,
        id: crypto.randomUUID(),
      }],
    }));
  };

  const removeReminder = (id: string) => {
    setSettings(prev => ({
      ...prev,
      reminders: prev.reminders.filter(r => r.id !== id),
    }));
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setSettings(prev => ({
      ...prev,
      reminders: prev.reminders.map(r =>
        r.id === id ? { ...r, ...updates } : r
      ),
    }));
  };

  const toggleDay = (reminderId: string, day: string) => {
    setSettings(prev => ({
      ...prev,
      reminders: prev.reminders.map(r =>
        r.id === reminderId
          ? {
              ...r,
              days: r.days.includes(day)
                ? r.days.filter(d => d !== day)
                : [...r.days, day],
            }
          : r
      ),
    }));
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-white">Reminder Settings</h2>
        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                enabled: e.target.checked,
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 
              peer-focus:ring-violet-800 rounded-full peer peer-checked:after:translate-x-full 
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
              after:left-[2px] after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"
            />
            <span className="ml-3 text-sm font-medium text-slate-400">
              Enable Reminders
            </span>
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            activeTab === 'personal'
              ? 'bg-violet-500/20 text-violet-400 border border-violet-500'
              : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
          }`}
        >
          Personal Templates
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            activeTab === 'community'
              ? 'bg-violet-500/20 text-violet-400 border border-violet-500'
              : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
          }`}
        >
          Community Templates
        </button>
      </div>

      {activeTab === 'personal' ? (
        <>
          {/* Templates Section */}
          <div className="mb-8">
            <ReminderTemplates
              onApplyTemplate={(template) => {
                setSettings(prev => ({
                  ...prev,
                  reminders: template.reminders.map(reminder => ({
                    id: crypto.randomUUID(),
                    time: reminder.time,
                    days: reminder.days,
                    enabled: true,
                    message: reminder.message,
                  })),
                }));
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
              }}
            />
          </div>

          {error && (
            <div className="p-4 mb-6 bg-red-900/20 border border-red-900/30 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 bg-green-900/20 border border-green-900/30 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-sm text-green-400">Settings saved successfully!</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Notification Method */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-3">
                Notification Method
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['browser', 'email', 'both'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notificationMethod: method,
                    }))}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      settings.notificationMethod === method
                        ? 'bg-violet-500/20 border-violet-500 text-violet-400'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Reminders */}
            <div className="space-y-4">
              {settings.reminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="time"
                      value={reminder.time}
                      onChange={(e) => updateReminder(reminder.id, { time: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 
                        text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                    <button
                      onClick={() => removeReminder(reminder.id)}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(reminder.id, day)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          reminder.days.includes(day)
                            ? 'bg-violet-500/20 text-violet-400 border border-violet-500'
                            : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}

              <motion.button
                onClick={addReminder}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-white/5 rounded-lg border border-white/10 
                  text-slate-400 hover:bg-white/10 transition-colors flex items-center 
                  justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Reminder
              </motion.button>
            </div>

            {/* Save Button */}
            <motion.button
              onClick={saveSettings}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg 
                hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed 
                transition-colors"
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </motion.button>
          </div>
        </>
      ) : (
        <SharedTemplates
          onImportTemplate={(template) => {
            setSettings(prev => ({
              ...prev,
              reminders: [
                ...prev.reminders,
                ...template.reminders.map(reminder => ({
                  id: crypto.randomUUID(),
                  time: reminder.time,
                  days: reminder.days,
                  enabled: true,
                  message: reminder.message,
                })),
              ],
            }));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
          }}
        />
      )}
    </div>
  );
}
