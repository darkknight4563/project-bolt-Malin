import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Heart,
  Download,
  Search,
  Clock,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

interface SharedTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  reminders: {
    time: string;
    days: string[];
    message?: string;
  }[];
  authorId: string;
  authorName: string;
  likes: number;
  downloads: number;
  createdAt: any;
  isPublic: boolean;
}

interface SharedTemplatesProps {
  onImportTemplate: (template: SharedTemplate) => void;
}

export default function SharedTemplates({ onImportTemplate }: SharedTemplatesProps) {
  const { currentUser } = useAuth();
  const [templates, setTemplates] = useState<SharedTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<SharedTemplate | null>(null);

  useEffect(() => {
    loadTemplates();
  }, [selectedCategory]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError('');

      const templatesRef = collection(db, 'sharedTemplates');
      let q = query(
        templatesRef,
        where('isPublic', '==', true),
        orderBy('downloads', 'desc')
      );

      if (selectedCategory !== 'all') {
        q = query(
          templatesRef,
          where('isPublic', '==', true),
          where('category', '==', selectedCategory),
          orderBy('downloads', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      const loadedTemplates = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as SharedTemplate[];

      setTemplates(loadedTemplates);
    } catch (error) {
      console.error('Error loading shared templates:', error);
      setError('Failed to load shared templates');
    } finally {
      setLoading(false);
    }
  };

  const shareTemplate = async (template: any) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      const sharedTemplate = {
        ...template,
        authorId: currentUser.uid,
        authorName: userData?.fullName || 'Anonymous',
        likes: 0,
        downloads: 0,
        createdAt: serverTimestamp(),
        isPublic: true,
      };

      await addDoc(collection(db, 'sharedTemplates'), sharedTemplate);
      setShareSuccess(true);
      setTimeout(() => {
        setShareSuccess(false);
        setShowShareModal(false);
      }, 2000);

      loadTemplates();
    } catch (error) {
      console.error('Error sharing template:', error);
      setError('Failed to share template');
    }
  };

  const downloadTemplate = async (template: SharedTemplate) => {
    try {
      // Update download count
      const templateRef = doc(db, 'sharedTemplates', template.id);
      await updateDoc(templateRef, {
        downloads: increment(1),
      });

      // Import the template
      onImportTemplate(template);

      // Refresh templates list
      loadTemplates();
    } catch (error) {
      console.error('Error downloading template:', error);
      setError('Failed to download template');
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light text-white">Community Templates</h3>
        <button
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-violet-500 
            text-white hover:bg-violet-600 transition-colors"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Template
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
            w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 
              rounded-lg text-white placeholder-slate-400 focus:ring-2 
              focus:ring-violet-500 focus:border-violet-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
            text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
        >
          <option value="all">All Categories</option>
          <option value="general">General</option>
          <option value="mindfulness">Mindfulness</option>
          <option value="wellness">Wellness</option>
          <option value="productivity">Productivity</option>
        </select>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-900/30 rounded-lg 
          flex items-center"
        >
          <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-400">
            Loading templates...
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400">
            No templates found
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative group p-6 bg-white/5 hover:bg-white/10 
                backdrop-blur-xl rounded-lg border border-white/10 
                hover:border-white/20 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">
                    {template.name}
                  </h4>
                  <p className="text-sm text-slate-400 mb-2">
                    {template.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {template.authorName}
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  {template.downloads}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {template.reminders.map((reminder, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 bg-white/5 rounded-md border 
                      border-white/10"
                  >
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-400">
                        {reminder.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => downloadTemplate(template)}
                className="w-full px-4 py-2 bg-violet-500/20 text-violet-400 
                  rounded-lg hover:bg-violet-500/30 transition-colors flex 
                  items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Import Template
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
              flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg p-6 bg-slate-900 rounded-lg 
                shadow-xl"
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-slate-400 
                  hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-medium text-white mb-4">
                Share Template
              </h3>

              {shareSuccess ? (
                <div className="p-4 bg-green-900/20 border border-green-900/30 
                  rounded-lg flex items-center"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-sm text-green-400">
                    Template shared successfully!
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-400">
                    Share your template with the community. Others will be able to 
                    use and customize it.
                  </p>

                  {/* Template Selection Form */}
                  {/* Add form fields for template customization */}
                  
                  <button
                    onClick={() => shareTemplate(currentTemplate)}
                    className="w-full px-4 py-2 bg-violet-500 text-white 
                      rounded-lg hover:bg-violet-600 transition-colors flex 
                      items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Template
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
