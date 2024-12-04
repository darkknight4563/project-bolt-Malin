import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Moon,
  Coffee,
  Sunset,
  Zap,
  Clock,
  Calendar,
  Plus,
  Heart,
  Lotus,
  Brain,
  Smile,
  Battery,
  Shield,
  BookOpen,
  Sparkles,
  Leaf,
  Cloud,
} from 'lucide-react';
import SchedulePatterns from './SchedulePatterns';

interface ReminderTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  category: 'general' | 'wellness' | 'mindfulness' | 'productivity';
  reminders: {
    time: string;
    days: string[];
    message?: string;
  }[];
  scheduleRules?: any[];
}

interface ReminderTemplatesProps {
  onApplyTemplate: (template: ReminderTemplate) => void;
}

interface ScheduleRule {
  // Add properties for ScheduleRule here
}

const templates: ReminderTemplate[] = [
  // General Templates
  {
    id: 'morning-routine',
    name: 'Morning Routine',
    description: 'Start your day mindfully',
    icon: Sun,
    color: 'text-amber-400 bg-amber-500/10',
    category: 'general',
    reminders: [
      {
        time: '08:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'Good morning! How are you feeling today?',
      },
      {
        time: '09:00',
        days: ['Sat', 'Sun'],
        message: 'Time for a peaceful start to your weekend.',
      },
    ],
  },
  {
    id: 'evening-reflection',
    name: 'Evening Reflection',
    description: 'Reflect on your day',
    icon: Moon,
    color: 'text-blue-400 bg-blue-500/10',
    category: 'general',
    reminders: [
      {
        time: '21:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        message: 'Take a moment to reflect on your day.',
      },
    ],
  },

  // Mindfulness Templates
  {
    id: 'meditation-practice',
    name: 'Meditation Practice',
    description: 'Regular meditation sessions',
    icon: Lotus,
    color: 'text-teal-400 bg-teal-500/10',
    category: 'mindfulness',
    reminders: [
      {
        time: '07:30',
        days: ['Mon', 'Wed', 'Fri'],
        message: 'Time for your morning meditation practice.',
      },
      {
        time: '17:30',
        days: ['Tue', 'Thu'],
        message: 'Evening meditation session to unwind.',
      },
    ],
  },
  {
    id: 'mindful-breaks',
    name: 'Mindful Breaks',
    description: 'Short mindfulness pauses',
    icon: Cloud,
    color: 'text-sky-400 bg-sky-500/10',
    category: 'mindfulness',
    reminders: [
      {
        time: '11:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'Take a mindful breathing break.',
      },
      {
        time: '15:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'Pause for a moment of mindfulness.',
      },
    ],
  },

  // Wellness Templates
  {
    id: 'stress-management',
    name: 'Stress Management',
    description: 'Regular stress relief practices',
    icon: Brain,
    color: 'text-purple-400 bg-purple-500/10',
    category: 'wellness',
    reminders: [
      {
        time: '10:30',
        days: ['Mon', 'Wed', 'Fri'],
        message: 'Check your stress levels and take a breather.',
      },
      {
        time: '16:30',
        days: ['Tue', 'Thu'],
        message: 'Time for a stress-relief exercise.',
      },
    ],
  },
  {
    id: 'emotional-check-in',
    name: 'Emotional Check-in',
    description: 'Monitor your emotional state',
    icon: Heart,
    color: 'text-rose-400 bg-rose-500/10',
    category: 'wellness',
    reminders: [
      {
        time: '09:30',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'How are you feeling emotionally?',
      },
      {
        time: '14:30',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'Take a moment to check in with your emotions.',
      },
    ],
  },
  {
    id: 'gratitude-practice',
    name: 'Gratitude Practice',
    description: 'Daily gratitude reflection',
    icon: Sparkles,
    color: 'text-yellow-400 bg-yellow-500/10',
    category: 'wellness',
    reminders: [
      {
        time: '08:30',
        days: ['Mon', 'Wed', 'Fri', 'Sun'],
        message: 'What are you grateful for today?',
      },
      {
        time: '20:30',
        days: ['Tue', 'Thu', 'Sat'],
        message: 'Reflect on today\'s moments of gratitude.',
      },
    ],
  },

  // Productivity Templates
  {
    id: 'energy-management',
    name: 'Energy Management',
    description: 'Optimize your energy levels',
    icon: Battery,
    color: 'text-green-400 bg-green-500/10',
    category: 'productivity',
    reminders: [
      {
        time: '10:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'Check your energy levels and adjust accordingly.',
      },
      {
        time: '15:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'Time for an energy reset.',
      },
    ],
  },
  {
    id: 'focus-sessions',
    name: 'Focus Sessions',
    description: 'Structured work intervals',
    icon: BookOpen,
    color: 'text-indigo-400 bg-indigo-500/10',
    category: 'productivity',
    reminders: [
      {
        time: '09:30',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'Starting your focused work session.',
      },
      {
        time: '14:30',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        message: 'Afternoon focus session beginning.',
      },
    ],
  },
  {
    id: 'self-care-breaks',
    name: 'Self-Care Breaks',
    description: 'Regular self-care moments',
    icon: Leaf,
    color: 'text-emerald-400 bg-emerald-500/10',
    category: 'wellness',
    reminders: [
      {
        time: '11:30',
        days: ['Mon', 'Wed', 'Fri'],
        message: 'Time for a self-care moment.',
      },
      {
        time: '16:30',
        days: ['Tue', 'Thu'],
        message: 'Take a break for self-care.',
      },
    ],
  },
];

const categories = [
  { id: 'all', name: 'All Templates', icon: Sparkles },
  { id: 'general', name: 'General', icon: Calendar },
  { id: 'mindfulness', name: 'Mindfulness', icon: Lotus },
  { id: 'wellness', name: 'Wellness', icon: Heart },
  { id: 'productivity', name: 'Productivity', icon: Zap },
];

export default function ReminderTemplates({ onApplyTemplate }: ReminderTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<ReminderTemplate['category'] | 'all'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<ReminderTemplate | null>(null);
  const [scheduleRule, setScheduleRule] = useState<ScheduleRule | null>(null);

  const handleSchedulePatternSelect = (rule: ScheduleRule) => {
    setScheduleRule(rule);
    if (selectedTemplate) {
      setSelectedTemplate({
        ...selectedTemplate,
        scheduleRules: [rule],
      });
    }
  };

  const filteredTemplates = templates.filter(
    template => selectedCategory === 'all' || template.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light text-white">Quick Templates</h3>
        <span className="text-sm text-slate-400">
          Choose a template to get started
        </span>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm
              ${selectedCategory === category.id
                ? 'bg-violet-500/20 text-violet-400 border border-violet-500'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              } transition-colors`}
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.name}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <motion.button
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group text-left p-6 bg-white/5 hover:bg-white/10 
              backdrop-blur-xl rounded-lg border border-white/10 hover:border-white/20 
              transition-all duration-200"
          >
            <div className={`inline-flex p-3 rounded-lg ${template.color} mb-4`}>
              <template.icon className="w-6 h-6" />
            </div>

            <h4 className="text-lg font-medium text-white mb-2">
              {template.name}
            </h4>

            <p className="text-sm text-slate-400 mb-4">
              {template.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {template.reminders.map((reminder, index) => (
                <div
                  key={index}
                  className="px-2 py-1 bg-white/5 rounded-md border border-white/10"
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-400">
                      {reminder.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 
              group-hover:ring-white/20 transition-all duration-200" 
            />
          </motion.button>
        ))}

        {/* Custom Template Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onApplyTemplate({
            id: 'custom',
            name: 'Custom Template',
            description: 'Create your own schedule',
            icon: Plus,
            color: 'text-emerald-400 bg-emerald-500/10',
            category: 'general',
            reminders: [{
              time: '09:00',
              days: ['Mon', 'Wed', 'Fri'],
              message: 'Time for your custom reminder!',
            }],
          })}
          className="relative group h-full text-left p-6 bg-white/5 hover:bg-white/10 
            backdrop-blur-xl rounded-lg border border-dashed border-white/10 
            hover:border-white/20 transition-all duration-200"
        >
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="inline-flex p-3 rounded-lg text-emerald-400 
              bg-emerald-500/10 mb-4"
            >
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-medium text-white mb-2">
              Custom Template
            </h4>
            <p className="text-sm text-slate-400">
              Create your own reminder schedule
            </p>
          </div>

          <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 
            group-hover:ring-white/20 transition-all duration-200" 
          />
        </motion.button>
      </div>

      {selectedTemplate && (
        <div className="space-y-6">
          <div className="bg-white/5 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Schedule Pattern
            </h3>
            <SchedulePatterns onSelectPattern={handleSchedulePatternSelect} />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onApplyTemplate(selectedTemplate)}
            className="relative group text-left p-6 bg-white/5 hover:bg-white/10 
              backdrop-blur-xl rounded-lg border border-white/10 hover:border-white/20 
              transition-all duration-200"
          >
            <h4 className="text-lg font-medium text-white mb-2">
              Apply Template
            </h4>
          </motion.button>
        </div>
      )}
    </div>
  );
}
