import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Activity,
  Calendar,
  Sun,
  CloudRain,
  Smile,
  Meh,
  Frown,
  Info,
} from 'lucide-react';

interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad';
  energy: number;
  activities: string[];
  timestamp: Date;
  notes: string;
}

interface MoodAnalyticsProps {
  moodEntries: MoodEntry[];
}

export default function MoodAnalytics({ moodEntries }: MoodAnalyticsProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'mood' | 'energy'>('mood');

  // Convert mood to numerical value for charts
  const moodToNumber = (mood: 'happy' | 'neutral' | 'sad'): number => {
    switch (mood) {
      case 'happy': return 3;
      case 'neutral': return 2;
      case 'sad': return 1;
    }
  };

  // Format data for trend chart
  const getTrendData = () => {
    const now = new Date();
    const timeframeDays = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
    const cutoffDate = new Date(now.setDate(now.getDate() - timeframeDays));

    return moodEntries
      .filter(entry => new Date(entry.timestamp) > cutoffDate)
      .map(entry => ({
        date: new Date(entry.timestamp).toLocaleDateString(),
        mood: moodToNumber(entry.mood),
        energy: entry.energy,
        timestamp: new Date(entry.timestamp),
      }))
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  // Calculate mood distribution
  const getMoodDistribution = () => {
    const distribution = { happy: 0, neutral: 0, sad: 0 };
    moodEntries.forEach(entry => {
      distribution[entry.mood]++;
    });
    return [
      { name: 'Happy', value: distribution.happy, color: '#22c55e' },
      { name: 'Neutral', value: distribution.neutral, color: '#eab308' },
      { name: 'Sad', value: distribution.sad, color: '#ef4444' },
    ];
  };

  // Calculate activity correlations
  const getActivityCorrelations = () => {
    const correlations: { [key: string]: { count: number; avgMood: number } } = {};

    moodEntries.forEach(entry => {
      entry.activities.forEach(activity => {
        if (!correlations[activity]) {
          correlations[activity] = { count: 0, avgMood: 0 };
        }
        correlations[activity].count++;
        correlations[activity].avgMood += moodToNumber(entry.mood);
      });
    });

    return Object.entries(correlations)
      .map(([activity, data]) => ({
        activity,
        avgMood: data.avgMood / data.count,
        count: data.count,
      }))
      .sort((a, b) => b.avgMood - a.avgMood)
      .slice(0, 5);
  };

  // Calculate insights
  const getInsights = () => {
    const insights: string[] = [];
    const trendData = getTrendData();
    
    if (trendData.length > 0) {
      // Mood trend
      const recentMoods = trendData.slice(-3);
      const avgRecentMood = recentMoods.reduce((sum, d) => sum + d.mood, 0) / recentMoods.length;
      const avgOverallMood = trendData.reduce((sum, d) => sum + d.mood, 0) / trendData.length;
      
      if (avgRecentMood > avgOverallMood) {
        insights.push('Your mood has been improving recently! Keep up the good work! 🌟');
      } else if (avgRecentMood < avgOverallMood) {
        insights.push('Your mood has been lower than usual. Consider engaging in activities that make you happy. 💪');
      }

      // Activity insights
      const correlations = getActivityCorrelations();
      if (correlations.length > 0) {
        insights.push(`${correlations[0].activity} seems to have the most positive impact on your mood. 🎯`);
      }

      // Consistency insights
      const daysBetweenEntries = trendData
        .slice(1)
        .map((entry, i) => entry.timestamp.getTime() - trendData[i].timestamp.getTime())
        .map(diff => diff / (1000 * 60 * 60 * 24));
      
      const avgDaysBetweenEntries = daysBetweenEntries.reduce((sum, days) => sum + days, 0) / daysBetweenEntries.length;
      if (avgDaysBetweenEntries > 2) {
        insights.push('Try tracking your mood more regularly for better insights! 📝');
      }
    }

    return insights;
  };

  const trendData = getTrendData();
  const moodDistribution = getMoodDistribution();
  const activityCorrelations = getActivityCorrelations();
  const insights = getInsights();

  return (
    <div className="space-y-8">
      {/* Time Frame Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-white">Mood Analytics</h2>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                timeframe === t
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {moodEntries.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6 text-center">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-400">
            Start tracking your mood to see analytics and insights!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-light text-white">Mood Trends</h3>
              <div className="flex gap-2">
                {(['mood', 'energy'] as const).map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedMetric === metric
                        ? 'bg-violet-500/20 text-violet-400 border border-violet-500'
                        : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="date"
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    domain={selectedMetric === 'mood' ? [1, 3] : [1, 10]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30,41,59,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mood Distribution */}
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6">
            <h3 className="text-lg font-light text-white mb-6">Mood Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30,41,59,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {moodDistribution.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-slate-400">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Impact */}
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6">
            <h3 className="text-lg font-light text-white mb-6">Activity Impact</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityCorrelations} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    type="number"
                    domain={[1, 3]}
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  />
                  <YAxis
                    dataKey="activity"
                    type="category"
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30,41,59,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="avgMood" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6">
            <h3 className="text-lg font-light text-white mb-6">Insights</h3>
            <div className="space-y-4">
              {insights.length === 0 ? (
                <p className="text-slate-400">
                  Track more moods to receive personalized insights!
                </p>
              ) : (
                insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <p className="text-slate-400">{insight}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
