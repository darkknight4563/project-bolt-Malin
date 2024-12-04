import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Shield,
  Bell,
  Palette,
  Lock,
  Globe,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ElementType;
  fields: string[];
}

const sections: ProfileSection[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: User,
    fields: ['fullName', 'bio'],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    fields: ['password', 'twoFactorEnabled'],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    fields: ['weeklyProgress', 'communityUpdates', 'newResources', 'sessionReminders', 'tipsAndRecommendations'],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Palette,
    fields: ['darkMode', 'theme', 'fontSize'],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    icon: Lock,
    fields: ['dataSharing', 'activityVisible'],
  },
  {
    id: 'language',
    title: 'Language & Region',
    icon: Globe,
    fields: ['language', 'timezone', 'dateFormat'],
  },
];

interface ProfileProgressProps {
  userSettings: any;
  onSectionClick: (sectionId: string) => void;
}

export default function ProfileProgress({ userSettings, onSectionClick }: ProfileProgressProps) {
  const calculateSectionProgress = (section: ProfileSection): number => {
    if (!userSettings) return 0;
    
    const completedFields = section.fields.filter(field => {
      const value = field.includes('.') 
        ? field.split('.').reduce((obj, key) => obj?.[key], userSettings)
        : userSettings[field];
      return value !== undefined && value !== null && value !== '';
    });

    return (completedFields.length / section.fields.length) * 100;
  };

  const calculateTotalProgress = (): number => {
    if (!userSettings) return 0;

    const totalFields = sections.reduce((sum, section) => sum + section.fields.length, 0);
    const completedFields = sections.reduce((sum, section) => {
      return sum + section.fields.filter(field => {
        const value = field.includes('.')
          ? field.split('.').reduce((obj, key) => obj?.[key], userSettings)
          : userSettings[field];
        return value !== undefined && value !== null && value !== '';
      }).length;
    }, 0);

    return Math.round((completedFields / totalFields) * 100);
  };

  const totalProgress = calculateTotalProgress();

  return (
    <div className="bg-white/5 rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-200">Profile Completion</h3>
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Overall Progress</span>
            <span>{totalProgress}%</span>
          </div>
          <div className="mt-2 relative">
            <div className="h-2 bg-white/5 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-violet-600 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const progress = calculateSectionProgress(section);
          const Icon = section.icon;
          
          return (
            <motion.button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <div className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className={`p-2 rounded-lg ${
                  progress === 100 ? 'bg-green-500/10' : 'bg-violet-500/10'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    progress === 100 ? 'text-green-400' : 'text-violet-400'
                  }`} />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-200">
                      {section.title}
                    </span>
                    <span className="text-xs text-slate-400">
                      {progress}%
                    </span>
                  </div>
                  <div className="mt-1 h-1 bg-white/5 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        progress === 100 ? 'bg-green-500' : 'bg-violet-600'
                      }`}
                    />
                  </div>
                </div>
                {progress === 100 ? (
                  <CheckCircle className="w-5 h-5 text-green-400 ml-4" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-violet-400 ml-4" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {totalProgress < 100 && (
        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-slate-400">
            Complete your profile to unlock all features and personalize your experience.
          </p>
        </div>
      )}
    </div>
  );
}
