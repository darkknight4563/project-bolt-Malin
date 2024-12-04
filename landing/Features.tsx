import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  BarChart2, 
  MessageCircle, 
  Shield, 
  Calendar 
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Access a library of guided meditations designed for different needs and experience levels.'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Track your emotional well-being and identify patterns to better understand yourself.'
  },
  {
    icon: BarChart2,
    title: 'Progress Insights',
    description: 'Visualize your journey with detailed analytics and personalized insights.'
  },
  {
    icon: MessageCircle,
    title: 'Professional Support',
    description: 'Connect with licensed therapists and counselors when you need additional guidance.'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is encrypted and protected. We prioritize your privacy and security.'
  },
  {
    icon: Calendar,
    title: 'Daily Routines',
    description: 'Build healthy habits with customizable routines and gentle reminders.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need for Mental Wellness
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover tools and features designed to support your mental health journey,
            all in one comprehensive platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-violet-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-violet-100 text-violet-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
