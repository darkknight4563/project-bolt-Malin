import React, { useState } from 'react';
import { Smile, Sun, Moon, CloudRain, Heart } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

interface MoodMetric {
  name: string;
  icon: React.ReactNode;
  value: number;
  color: string;
}

export default function MoodTrackerDemo() {
  const [metrics, setMetrics] = useState<MoodMetric[]>([
    { name: 'Happiness', icon: <Smile className="w-5 h-5" />, value: 70, color: 'from-yellow-500 to-orange-500' },
    { name: 'Energy', icon: <Sun className="w-5 h-5" />, value: 60, color: 'from-blue-500 to-violet-500' },
    { name: 'Sleep', icon: <Moon className="w-5 h-5" />, value: 80, color: 'from-indigo-500 to-purple-500' },
    { name: 'Stress', icon: <CloudRain className="w-5 h-5" />, value: 30, color: 'from-rose-500 to-red-500' },
    { name: 'Gratitude', icon: <Heart className="w-5 h-5" />, value: 90, color: 'from-pink-500 to-rose-500' },
  ]);

  const handleSliderChange = (index: number, newValue: number) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index] = { ...updatedMetrics[index], value: newValue };
    setMetrics(updatedMetrics);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl sm:text-title text-center text-slate-900 mb-4">
              Track Your <span className="font-medium">Daily Mood</span>
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12">
              Experience our intuitive mood tracking interface. Adjust the sliders to see how 
              you're feeling across different aspects of your well-being.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {metrics.map((metric, index) => (
                <motion.div 
                  key={index} 
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className={`p-2 rounded-lg bg-gradient-to-r ${metric.color} 
                          text-white shadow-sm`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {metric.icon}
                      </motion.div>
                      <span className="font-medium text-slate-700">{metric.name}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{metric.value}%</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={metric.value}
                      onChange={(e) => handleSliderChange(index, Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                        [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:shadow-md
                        [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                        [&::-webkit-slider-thumb]:${metric.color}"
                    />
                    <motion.div
                      className={`absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r ${metric.color}`}
                      style={{ width: `${metric.value}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}

              <motion.div 
                className="pt-6 border-t border-slate-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-slate-600">Overall Wellness Score</span>
                  </div>
                  <span className="font-medium text-emerald-600">
                    {Math.round(metrics.reduce((acc, curr) => acc + curr.value, 0) / metrics.length)}%
                  </span>
                </div>
                <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.round(metrics.reduce((acc, curr) => acc + curr.value, 0) / metrics.length)}%` 
                    }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  ></motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                This is a demo of our mood tracking feature. Sign up to start tracking your daily moods 
                and discover patterns in your emotional well-being.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}