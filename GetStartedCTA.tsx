import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import Button from './ui/Button';

export default function GetStartedCTA() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    navigate('/get-started');
  };

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="primary"
          size="lg"
          loading={isLoading}
          icon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
          onClick={handleGetStarted}
          className="shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Start Your Wellness Journey
          </span>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/consultation')}
          icon={<Calendar className="w-5 h-5" />}
          iconPosition="left"
          className="shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Schedule Free Consultation
        </Button>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-96 h-96 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  );
}