import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-title font-light text-slate-900 mb-4 sm:mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-lg sm:text-body-lg text-slate-600 mb-8 sm:mb-10 font-light">
            Take the first step towards a more balanced, fulfilling life. 
            Our expert therapists are here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
              px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:shadow-lg hover:shadow-violet-200 
              transition-all duration-300 flex items-center gap-2 justify-center">
              Schedule a Consultation
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full 
              font-medium border border-slate-200 hover:border-violet-200 hover:shadow-lg 
              hover:shadow-slate-100 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}