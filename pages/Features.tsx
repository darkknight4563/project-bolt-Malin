import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Sparkles, LineChart, Users, Bell, Calendar } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const mainFeatures = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Insights",
    description: "Advanced algorithms analyze your emotional patterns to provide personalized recommendations.",
    color: "from-violet-500 to-indigo-500",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1800"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Mindfulness Exercises",
    description: "Curated collection of meditation and breathing exercises for stress relief.",
    color: "from-rose-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1800"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Progress Tracking",
    description: "Visualize your wellness journey with detailed analytics and insights.",
    color: "from-emerald-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1800"
  }
];

const additionalFeatures = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Smart Recommendations",
    description: "Get personalized content and exercise suggestions based on your mood patterns."
  },
  {
    icon: <LineChart className="w-5 h-5" />,
    title: "Mood Analytics",
    description: "Track and analyze your emotional well-being over time with intuitive visualizations."
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Community Support",
    description: "Connect with others on similar journeys in our moderated support groups."
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Smart Reminders",
    description: "Gentle notifications to help you maintain your wellness routine."
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Habit Formation",
    description: "Build lasting positive habits with our structured approach."
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-violet-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6"
          >
            Powerful <span className="font-medium">Features</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            Discover the tools and features that make our platform the perfect companion 
            for your mental wellness journey.
          </motion.p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl shadow-xl overflow-hidden group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 
                        transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} 
                        flex items-center justify-center text-white mb-2`}>
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-medium text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-display text-2xl sm:text-3xl text-center text-slate-900 mb-16">
              Everything You Need to <span className="font-medium">Thrive</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center 
                    text-violet-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-medium text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Demo */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl text-slate-900 mb-6">
                See Our Features in <span className="font-medium">Action</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Experience how our features work together to create a comprehensive 
                mental wellness platform.
              </p>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1800"
                  alt="Feature demonstration"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}