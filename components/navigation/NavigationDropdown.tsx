import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayCircle, Star } from 'lucide-react';
import { dropdownContent, DropdownCategory } from './NavigationDropdownContent';

interface NavigationDropdownProps {
  isOpen: boolean;
  category: string;
  onClose: () => void;
}

export default function NavigationDropdown({ isOpen, category, onClose }: NavigationDropdownProps) {
  const content = dropdownContent[category as DropdownCategory];
  
  if (!content) return null;

  const renderGraph = (data: number[], color: string) => {
    const max = Math.max(...data);
    const getHeight = (value: number) => (value / max) * 100;

    return (
      <div className="flex items-end h-12 gap-0.5">
        {data.map((value, i) => (
          <motion.div
            key={i}
            className={`w-1 bg-${color}-500 rounded-t`}
            initial={{ height: 0 }}
            animate={{ height: `${getHeight(value)}%` }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md 
              shadow-lg border-t border-slate-200/80 z-50"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="font-display text-xl font-medium text-slate-900 mb-2">
                      {content.title}
                    </h2>
                    <p className="text-slate-600 mb-6">
                      {content.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6">
                  {content.items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={onClose}
                      className="group p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                    >
                      <div className="flex flex-col gap-4">
                        {'preview' in item && (
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <img
                              src={item.preview}
                              alt={item.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 
                                transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 
                              to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                              duration-300 flex items-center justify-center">
                              {'graph' in item ? (
                                <div className="px-4 w-full">
                                  {renderGraph(item.graph.data, item.graph.color)}
                                </div>
                              ) : 'stats' in item ? (
                                <div className="flex items-center gap-2 text-white text-sm">
                                  <Star className="w-4 h-4" />
                                  {item.stats}
                                </div>
                              ) : 'badge' in item ? (
                                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full 
                                  text-white text-xs font-medium">
                                  {item.badge}
                                </span>
                              ) : (
                                <PlayCircle className="w-8 h-8 text-white" />
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-white shadow-sm group-hover:shadow 
                            transition-shadow duration-200">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900 mb-1 group-hover:text-violet-600 
                              transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}