import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Your Journey',
    description: 'Let\'s get to know you better so we can personalize your experience.'
  },
  {
    id: 'goals',
    title: 'Set Your Goals',
    description: 'What would you like to achieve on your wellness journey?'
  },
  {
    id: 'preferences',
    title: 'Your Preferences',
    description: 'Help us customize your experience to your needs.'
  },
  {
    id: 'complete',
    title: 'All Set!',
    description: 'Your personalized wellness plan is ready.'
  }
];

export default function GetStarted() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

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
            Get <span className="font-medium">Started</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto"
          >
            Begin your journey to better mental wellness in just a few simple steps.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            {/* Progress Steps */}
            <div className="flex justify-between mb-12">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-1 ${
                      index < currentStep ? 'bg-violet-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Current Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="font-display text-2xl font-medium text-slate-900 mb-4">
                {steps[currentStep].title}
              </h2>
              <p className="text-slate-600 mb-8">
                {steps[currentStep].description}
              </p>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={() => navigate('/wellness-plan')}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 
                    to-indigo-600 text-white font-medium rounded-full hover:shadow-lg 
                    transition-all duration-300"
                >
                  View Your Plan
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 
                    to-indigo-600 text-white font-medium rounded-full hover:shadow-lg 
                    transition-all duration-300"
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              )}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}