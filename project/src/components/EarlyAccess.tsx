import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const features = [
  'Personalized mindfulness recommendations',
  'Advanced mood tracking and analytics',
  'Access to expert-curated content',
  'Early adopter benefits',
  'Priority support'
];

export default function EarlyAccess() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-violet-500 to-indigo-500 
                  rounded-2xl flex items-center justify-center text-white"
              >
                <Smartphone className="w-8 h-8" />
              </motion.div>
              <h2 className="font-display text-2xl sm:text-3xl text-slate-900 mb-4">
                Get <span className="font-medium">Early Access</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Be among the first to experience our revolutionary mental wellness app. 
                Sign up now for exclusive early access and special perks.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Form */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 
                        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
                      px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 
                      disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      'Securing Your Spot...'
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-emerald-600 justify-center"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>You're on the list! We'll be in touch soon.</span>
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <h3 className="font-display text-lg font-medium text-slate-900 mb-4">
                  Early Access Benefits
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-violet-600" />
                      </div>
                      <span className="text-slate-600">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-500">
                    Limited spots available. Join now to secure your place and help shape 
                    the future of mental wellness technology.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}