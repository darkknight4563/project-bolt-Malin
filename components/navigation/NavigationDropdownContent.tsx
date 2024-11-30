import React from 'react';
import { Timer, Brain, LineChart, BookOpen, Leaf, Heart, Sparkles, Moon, Music, Wind, 
  Headphones, PlayCircle, Users, MessageCircle, Calendar, Trophy, Star, Shield, Lock, 
  Settings, FileText, Smile, BarChart, PenTool, Activity } from 'lucide-react';

export const dropdownContent = {
  features: {
    title: 'Key Features',
    description: 'Discover tools designed for your mental wellness',
    items: [
      {
        icon: <Brain className="w-5 h-5 text-violet-600" />,
        title: 'Mindfulness Tools',
        description: 'Guided meditation and breathing exercises',
        href: '/features/mindfulness',
        preview: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200',
        badge: 'Popular'
      },
      {
        icon: <Timer className="w-5 h-5 text-emerald-600" />,
        title: 'Meditation Timer',
        description: 'Customizable meditation sessions',
        href: '/features/timer',
        preview: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200',
        badge: 'New'
      },
      {
        icon: <LineChart className="w-5 h-5 text-blue-600" />,
        title: 'Progress Tracking',
        description: 'Monitor your wellness journey',
        href: '/features/progress',
        preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200',
        stats: '87% of users report improvement'
      },
      {
        icon: <BookOpen className="w-5 h-5 text-rose-600" />,
        title: 'Journal Entries',
        description: 'Document your thoughts and feelings',
        href: '/features/journal',
        preview: 'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?auto=format&fit=crop&q=80&w=200',
        badge: 'Essential'
      }
    ]
  },
  'content-library': {
    title: 'Content Library',
    description: 'Explore our collection of wellness resources',
    items: [
      {
        icon: <Leaf className="w-5 h-5 text-emerald-600" />,
        title: 'Guided Meditations',
        description: 'Expert-led meditation sessions',
        href: '/library/meditations',
        preview: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200',
        stats: '200+ sessions'
      },
      {
        icon: <Wind className="w-5 h-5 text-blue-600" />,
        title: 'Breathing Exercises',
        description: 'Techniques for stress relief',
        href: '/library/breathing',
        preview: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=200',
        badge: 'Beginner Friendly'
      },
      {
        icon: <Moon className="w-5 h-5 text-indigo-600" />,
        title: 'Sleep Stories',
        description: 'Calming tales for better rest',
        href: '/library/sleep',
        preview: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&q=80&w=200',
        badge: 'Popular'
      },
      {
        icon: <Music className="w-5 h-5 text-violet-600" />,
        title: 'Calming Sounds',
        description: 'Nature and ambient soundscapes',
        href: '/library/sounds',
        preview: 'https://images.unsplash.com/photo-1519874179391-3ebc752241dd?auto=format&fit=crop&q=80&w=200',
        stats: '100+ tracks'
      }
    ]
  },
  community: {
    title: 'Community',
    description: 'Connect with others on their wellness journey',
    items: [
      {
        icon: <Users className="w-5 h-5 text-violet-600" />,
        title: 'Support Groups',
        description: 'Join themed discussion groups',
        href: '/community/groups',
        preview: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=200',
        stats: '5k+ members'
      },
      {
        icon: <MessageCircle className="w-5 h-5 text-emerald-600" />,
        title: 'Discussion Forums',
        description: 'Share experiences and advice',
        href: '/community/forums',
        preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200',
        badge: 'Active'
      },
      {
        icon: <Calendar className="w-5 h-5 text-blue-600" />,
        title: 'Events Calendar',
        description: 'Upcoming workshops and sessions',
        href: '/community/events',
        preview: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=200',
        badge: 'New Events'
      },
      {
        icon: <Trophy className="w-5 h-5 text-amber-600" />,
        title: 'Success Stories',
        description: 'Inspiring member journeys',
        href: '/community/stories',
        preview: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=200',
        stats: '1000+ stories'
      }
    ]
  },
  privacy: {
    title: 'Privacy & Security',
    description: 'Your data protection is our priority',
    items: [
      {
        icon: <Shield className="w-5 h-5 text-violet-600" />,
        title: 'Data Protection',
        description: 'How we keep your data safe',
        href: '/privacy/protection',
        preview: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=200',
        badge: 'Essential'
      },
      {
        icon: <Lock className="w-5 h-5 text-emerald-600" />,
        title: 'Security Settings',
        description: 'Customize your privacy options',
        href: '/privacy/settings',
        preview: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=200',
        badge: 'Important'
      },
      {
        icon: <Settings className="w-5 h-5 text-blue-600" />,
        title: 'Account Controls',
        description: 'Manage your account security',
        href: '/privacy/account',
        preview: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=200',
        stats: 'Enhanced Protection'
      },
      {
        icon: <FileText className="w-5 h-5 text-slate-600" />,
        title: 'Privacy Policy',
        description: 'Our commitment to your privacy',
        href: '/privacy/policy',
        preview: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=200',
        badge: 'Updated'
      }
    ]
  },
  mood: {
    title: 'Mood Tracker',
    description: 'Track and understand your emotional well-being',
    items: [
      {
        icon: <Smile className="w-5 h-5 text-violet-600" />,
        title: 'Daily Check-in',
        description: 'Log your daily mood and activities',
        href: '/mood/check-in',
        preview: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=200',
        graph: {
          data: [65, 70, 85, 75, 90, 85, 80],
          color: 'violet'
        }
      },
      {
        icon: <BarChart className="w-5 h-5 text-emerald-600" />,
        title: 'Mood Patterns',
        description: 'Visualize your emotional trends',
        href: '/mood/patterns',
        preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200',
        graph: {
          data: [45, 60, 75, 80, 75, 85, 90],
          color: 'emerald'
        }
      },
      {
        icon: <Activity className="w-5 h-5 text-blue-600" />,
        title: 'Analytics',
        description: 'Detailed mood and activity insights',
        href: '/mood/analytics',
        preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200',
        graph: {
          data: [70, 65, 80, 85, 90, 85, 80],
          color: 'blue'
        }
      },
      {
        icon: <PenTool className="w-5 h-5 text-rose-600" />,
        title: 'Custom Notes',
        description: 'Add context to your mood entries',
        href: '/mood/notes',
        preview: 'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?auto=format&fit=crop&q=80&w=200',
        graph: {
          data: [55, 70, 75, 80, 85, 90, 85],
          color: 'rose'
        }
      }
    ]
  }
};

export type DropdownCategory = keyof typeof dropdownContent;