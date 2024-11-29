import React from 'react';
import { motion } from 'framer-motion';

interface SupernovaDebrisProps {
  className?: string;
}

export default function SupernovaDebris({ className = '' }: SupernovaDebrisProps) {
  const particles = [
    { size: 'w-1 h-1', count: 12, speed: 2 },
    { size: 'w-0.5 h-0.5', count: 16, speed: 1.5 },
    { size: 'w-px h-px', count: 20, speed: 1 }
  ];

  return (
    <div className={`absolute inset-0 ${className}`}>
      {particles.map((particle, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {[...Array(particle.count)].map((_, i) => {
            const angle = (Math.random() * Math.PI * 2);
            const radius = Math.random() * 30 + 10;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={`${groupIndex}-${i}`}
                className={`absolute ${particle.size} rounded-full`}
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, x],
                  y: [0, y],
                }}
                transition={{
                  duration: particle.speed,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}