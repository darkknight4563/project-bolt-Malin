import React from 'react';
import { Sparkles, Heart, Shield } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-violet-600" />,
    title: "Personalized Care",
    description: "Tailored therapeutic approaches designed uniquely for your journey and goals."
  },
  {
    icon: <Shield className="w-8 h-8 text-violet-600" />,
    title: "Safe Space",
    description: "A confidential, luxurious environment where you can feel secure and supported."
  },
  {
    icon: <Heart className="w-8 h-8 text-violet-600" />,
    title: "Expert Guidance",
    description: "Access to certified therapists with years of specialized experience."
  }
];

export default function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-display text-2xl sm:text-title text-center text-slate-900 mb-12 sm:mb-16">
            Your Path to <span className="font-medium">Wellness</span>
          </h2>
        </AnimatedSection>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-slate-50 hover:bg-white 
                hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl 
                  bg-violet-50 mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-medium text-slate-900 mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}