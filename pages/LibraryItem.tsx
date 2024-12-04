import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { libraryContent } from '../lib/content/libraryContent';
import ErrorMessage from '../components/ErrorMessage';

export default function LibraryItem() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = slug ? libraryContent[slug] : null;

  if (!item) {
    return <ErrorMessage message="Content not found" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <button
          onClick={() => navigate('/content-library')}
          className="mb-8 text-slate-600 hover:text-violet-600 transition-colors"
        >
          Back to Library
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-medium text-slate-900 mb-6">
            {item.title}
          </h1>
          <div className="prose prose-slate max-w-none">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
}