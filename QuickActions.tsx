import React from 'react';
import { motion } from 'framer-motion';
import {
  PlusCircle,
  Calendar,
  BookOpen,
  MessageCircle,
  Activity,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  color: string;
}

export default function QuickActions() {
  const navigate = useNavigate();
  const { userSettings } = useAuth();

  const createQuickActions = (): QuickAction[] => [
    {
      id: 'track-mood',
      title: 'Track Mood',
      description: 'Log how you're feeling right now',
      icon: Activity,
      action: () => navigate('/mood-tracker/new'),
      color: 'bg-violet-500/10 text-violet-400',
    },
    {
      id: 'schedule-session',
      title: 'Schedule Session',
      description: 'Book time with a professional',
      icon: Calendar,
      action: () => navigate('/schedule'),
      color: 'bg-blue-500/10 text-blue-400',
    },
    {
      id: 'start-journal',
      title: 'Start Journal Entry',
      description: 'Write about your thoughts',
      icon: BookOpen,
      action: () => navigate('/journal/new'),
      color: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      id: 'join-community',
      title: 'Join Discussion',
      description: 'Connect with the community',
      icon: MessageCircle,
      action: () => navigate('/community'),
      color: 'bg-amber-500/10 text-amber-400',
    },
  ];

  const quickActions = createQuickActions();

  const handleAction = async (action: () => void) => {
    try {
      await action();
    } catch (error) {
      console.error('Error performing quick action:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions.map((action) => (
        <motion.button
          key={action.id}
          onClick={() => handleAction(action.action)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group bg-white/5 hover:bg-white/10 backdrop-blur-xl 
            rounded-lg p-6 text-left transition-all duration-200 border border-white/10 
            hover:border-white/20"
        >
          <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
            <action.icon className="w-6 h-6" />
          </div>
          
          <h3 className="text-lg font-medium text-white mb-2">
            {action.title}
          </h3>
          
          <p className="text-sm text-slate-400">
            {action.description}
          </p>

          <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 
            group-hover:ring-white/20 transition-all duration-200" 
          />
        </motion.button>
      ))}
    </div>
  );
}
