import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  ArrowUpRight,
  Repeat,
  RefreshCw,
  Brain,
  Activity,
} from 'lucide-react';
import { SchedulePattern, ScheduleRule, IntensityLevel } from '../types/ReminderTypes';

interface SchedulePatternsProps {
  onSelectPattern: (rule: ScheduleRule) => void;
}

const intensityColors = {
  low: 'text-green-400 bg-green-500/10',
  medium: 'text-yellow-400 bg-yellow-500/10',
  high: 'text-red-400 bg-red-500/10',
};

const patternTemplates: Array<{
  pattern: SchedulePattern;
  name: string;
  description: string;
  icon: React.ElementType;
  defaultRule: Partial<ScheduleRule>;
  intensityOptions: boolean;
}> = [
  {
    pattern: 'alternating',
    name: 'Alternating Days',
    description: 'Switch between different schedules',
    icon: RefreshCw,
    defaultRule: {
      pattern: 'alternating',
      alternatePattern: ['Mon,Wed,Fri', 'Tue,Thu'],
    },
    intensityOptions: false,
  },
  {
    pattern: 'progressive',
    name: 'Progressive Intensity',
    description: 'Gradually increase frequency',
    icon: ArrowUpRight,
    defaultRule: {
      pattern: 'progressive',
      intensityLevel: 'low',
      progressionRate: 1.2,
    },
    intensityOptions: true,
  },
  {
    pattern: 'cyclic',
    name: 'Cyclic Schedule',
    description: 'Active periods with rest intervals',
    icon: Repeat,
    defaultRule: {
      pattern: 'cyclic',
      cycleDuration: 21,
      restPeriod: 7,
    },
    intensityOptions: true,
  },
  {
    pattern: 'adaptive',
    name: 'Adaptive Schedule',
    description: 'Adjusts based on your engagement',
    icon: Brain,
    defaultRule: {
      pattern: 'adaptive',
      intensityLevel: 'medium',
    },
    intensityOptions: true,
  },
];

export default function SchedulePatterns({ onSelectPattern }: SchedulePatternsProps) {
  const [selectedPattern, setSelectedPattern] = React.useState<SchedulePattern | null>(null);
  const [selectedIntensity, setSelectedIntensity] = React.useState<IntensityLevel>('medium');
  const [customOptions, setCustomOptions] = React.useState<Partial<ScheduleRule>>({});

  const handlePatternSelect = (template: typeof patternTemplates[0]) => {
    setSelectedPattern(template.pattern);
    setCustomOptions(template.defaultRule);

    if (!template.intensityOptions) {
      onSelectPattern({
        ...template.defaultRule,
        pattern: template.pattern,
      } as ScheduleRule);
    }
  };

  const handleIntensitySelect = (intensity: IntensityLevel) => {
    setSelectedIntensity(intensity);
    if (selectedPattern && customOptions) {
      onSelectPattern({
        ...customOptions,
        intensityLevel: intensity,
      } as ScheduleRule);
    }
  };

  const renderPatternOptions = () => {
    const template = patternTemplates.find(t => t.pattern === selectedPattern);
    if (!template) return null;

    switch (template.pattern) {
      case 'alternating':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Schedule A Days
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 
                    text-white focus:ring-2 focus:ring-violet-500"
                  onChange={(e) => {
                    const newOptions = {
                      ...customOptions,
                      alternatePattern: [e.target.value, customOptions.alternatePattern?.[1] || ''],
                    };
                    setCustomOptions(newOptions);
                    onSelectPattern(newOptions as ScheduleRule);
                  }}
                >
                  <option value="Mon,Wed,Fri">Mon/Wed/Fri</option>
                  <option value="Tue,Thu">Tue/Thu</option>
                  <option value="Mon,Tue,Wed">Mon/Tue/Wed</option>
                  <option value="Thu,Fri,Sat">Thu/Fri/Sat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Schedule B Days
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 
                    text-white focus:ring-2 focus:ring-violet-500"
                  onChange={(e) => {
                    const newOptions = {
                      ...customOptions,
                      alternatePattern: [customOptions.alternatePattern?.[0] || '', e.target.value],
                    };
                    setCustomOptions(newOptions);
                    onSelectPattern(newOptions as ScheduleRule);
                  }}
                >
                  <option value="Tue,Thu">Tue/Thu</option>
                  <option value="Mon,Wed,Fri">Mon/Wed/Fri</option>
                  <option value="Thu,Fri,Sat">Thu/Fri/Sat</option>
                  <option value="Mon,Tue,Wed">Mon/Tue/Wed</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'progressive':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Progression Rate
              </label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                defaultValue={customOptions.progressionRate}
                onChange={(e) => {
                  const newOptions = {
                    ...customOptions,
                    progressionRate: parseFloat(e.target.value),
                  };
                  setCustomOptions(newOptions);
                  onSelectPattern(newOptions as ScheduleRule);
                }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Gradual</span>
                <span>Rapid</span>
              </div>
            </div>
          </div>
        );

      case 'cyclic':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Cycle Duration (days)
              </label>
              <input
                type="number"
                min="7"
                max="30"
                defaultValue={customOptions.cycleDuration}
                onChange={(e) => {
                  const newOptions = {
                    ...customOptions,
                    cycleDuration: parseInt(e.target.value),
                  };
                  setCustomOptions(newOptions);
                  onSelectPattern(newOptions as ScheduleRule);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 
                  text-white focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Rest Period (days)
              </label>
              <input
                type="number"
                min="1"
                max="7"
                defaultValue={customOptions.restPeriod}
                onChange={(e) => {
                  const newOptions = {
                    ...customOptions,
                    restPeriod: parseInt(e.target.value),
                  };
                  setCustomOptions(newOptions);
                  onSelectPattern(newOptions as ScheduleRule);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 
                  text-white focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-light text-white">Schedule Pattern</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patternTemplates.map((template) => (
          <motion.button
            key={template.pattern}
            onClick={() => handlePatternSelect(template)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative group text-left p-6 rounded-lg border 
              ${selectedPattern === template.pattern
                ? 'bg-violet-500/20 border-violet-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
              } transition-all duration-200`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/5">
                <template.icon className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-1">
                  {template.name}
                </h4>
                <p className="text-sm text-slate-400">
                  {template.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedPattern && patternTemplates.find(t => t.pattern === selectedPattern)?.intensityOptions && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Intensity Level</h4>
          <div className="flex gap-4">
            {(['low', 'medium', 'high'] as const).map((intensity) => (
              <button
                key={intensity}
                onClick={() => handleIntensitySelect(intensity)}
                className={`px-4 py-2 rounded-lg text-sm capitalize
                  ${selectedIntensity === intensity
                    ? intensityColors[intensity]
                    : 'bg-white/5 text-slate-400'
                  } border border-white/10`}
              >
                {intensity}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPattern && renderPatternOptions()}
    </div>
  );
}
