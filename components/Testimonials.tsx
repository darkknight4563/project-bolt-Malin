import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const testimonials = [
  {
    content: "The support and guidance I've received here has been transformative. I feel more equipped to handle life's challenges.",
    author: "Sarah M.",
    role: "Client",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    content: "A compassionate and professional approach to mental health care. The team here truly understands and cares.",
    author: "Michael R.",
    role: "Client",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    content: "The mindfulness exercises and resources provided have helped me develop better coping mechanisms.",
    author: "Emily L.",
    role: "Client",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-display text-2xl sm:text-title text-center text-slate-900 mb-4">
            Client <span className="font-medium">Testimonials</span>
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Read what our clients have to say about their experiences and transformative journeys with us.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-violet-200 mb-4" />
                
                <p className="text-slate-600 mb-6">
                  {testimonial.content}
                </p>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}