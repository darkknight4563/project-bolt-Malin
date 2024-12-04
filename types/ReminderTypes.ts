export type SchedulePattern = 
  | 'fixed'           // Regular fixed schedule
  | 'alternating'     // Alternating days
  | 'progressive'     // Gradually increasing intensity
  | 'adaptive'        // Adapts based on user engagement
  | 'cyclic';         // Repeating cycles with rest periods

export type IntensityLevel = 'low' | 'medium' | 'high';

export interface ScheduleRule {
  pattern: SchedulePattern;
  intensityLevel?: IntensityLevel;
  startDate?: string;
  endDate?: string;
  progressionRate?: number;      // For progressive patterns
  cycleDuration?: number;        // For cyclic patterns (in days)
  restPeriod?: number;          // For cyclic patterns (in days)
  alternatePattern?: string[];  // For alternating patterns
}

export interface Reminder {
  id: string;
  time: string;
  days: string[];
  enabled: boolean;
  message?: string;
  scheduleRule?: ScheduleRule;
}

export interface ReminderTemplate {
  id: string;
  name: string;
  description: string;
  category: 'general' | 'wellness' | 'mindfulness' | 'productivity';
  icon: string;
  color: string;
  reminders: Reminder[];
  scheduleRules?: ScheduleRule[];
  authorId?: string;
  authorName?: string;
  likes?: number;
  downloads?: number;
  createdAt?: any;
  isPublic?: boolean;
}
