import React from 'react';
import { motion } from 'framer-motion';
import { Watch, Trophy, Sparkles, Rocket, Lock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const upcomingFeatures = [
  {
    icon: <Watch className="w-6 h-6" />,
    title: "Wearable Integration",
    description: "Connect with your favorite fitness trackers and smartwatches to monitor heart rate, sleep patterns, and stress levels in real-time.",
    comingSoon: "Summer 2024",
    color: "from-violet-500 to-indigo-500",
    preview: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=1800"
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Wellness Challenges",
    description: "Engage in daily and weekly mindfulness challenges. Earn rewards and track your progress with our gamified wellness system.",
    comingSoon: "Fall 2024",
    color: "from-emerald-500 to-teal-500",
    preview: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=1800"
  }
];

const gamificationFeatures = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Achievement System",
    description: "Unlock badges and achievements as you progress in your wellness journey"
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "Weekly Challenges",
    description: "Participate in community challenges with rewards and recognition"
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Progress Milestones",
    description: "Track your growth with meaningful milestones and celebrations"
  }
];

export default function UpcomingFeatures() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-violet-100 
              text-violet-700 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              Coming Soon
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-slate-900 mb-4">
              The Future of <span className="font-medium">Mental Wellness</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get excited about these upcoming features that will revolutionize your wellness journey. 
              We're constantly innovating to bring you the best tools for mental health.
            </p>
          </div>
        </AnimatedSection>

        {/* Main Upcoming Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {upcomingFeatures.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={feature.preview}
                    alt={feature.title}
                    className="w-full h-full object-cover filter blur-[2px] group-hover:blur-0 
                      transform group-hover:scale-105 transition-all duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} 
                    mix-blend-multiply opacity-90 group-hover:opacity-75 transition-opacity`} />
                  
                  {/* Lock Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full 
                        flex items-center justify-center"
                    >
                      <Lock className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} 
                      flex items-center justify-center text-white`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-medium text-slate-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-violet-600 font-medium">
                        Coming {feature.comingSoon}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Gamification Preview */}
        <AnimatedSection delay={0.3}>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h3 className="font-display text-xl font-medium text-slate-900 mb-2">
                Gamification Elements
              </h3>
              <p className="text-slate-600">
                Make your wellness journey more engaging and rewarding with these upcoming 
                gamification features.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {gamificationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-slate-50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center 
                    justify-center text-violet-600 mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="font-medium text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-violet-50 rounded-xl text-center">
              <p className="text-sm text-violet-700">
                Join our early access program to be the first to try these exciting new features!
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}