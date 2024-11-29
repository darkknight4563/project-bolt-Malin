import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchPost, getStrapiImageUrl } from '../lib/api';
import type { Post } from '../types/strapi';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery<Post, { message: string }>(
    ['post', slug],
    () => fetchPost(slug!),
    {
      enabled: !!slug,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <ErrorBoundary>
      <article className="min-h-screen bg-white">
        <div className="h-[40vh] relative overflow-hidden">
          <img
            src={getStrapiImageUrl(post.attributes.featuredImage.data.attributes.url)}
            alt={post.attributes.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 -mt-32 relative">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center text-slate-600 hover:text-violet-600 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </button>

            <h1 className="font-display text-3xl sm:text-4xl font-medium text-slate-900 mb-6">
              {post.attributes.title}
            </h1>

            <div className="flex items-center mb-8 border-b border-slate-100 pb-8">
              <img
                src={getStrapiImageUrl(post.attributes.author.data.attributes.avatar.data.attributes.url)}
                alt={post.attributes.author.data.attributes.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-medium text-slate-900">
                  {post.attributes.author.data.attributes.name}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(post.attributes.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: post.attributes.content }}
            />
          </div>
        </div>
      </article>
    </ErrorBoundary>
  );
}