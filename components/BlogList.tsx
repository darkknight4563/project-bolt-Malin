import React from 'react';
import { useQuery } from 'react-query';
import { fetchPosts } from '../lib/api';
import type { Post } from '../types/strapi';
import BlogCard from './BlogCard';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

export default function BlogList() {
  const { data: posts, isLoading, error } = useQuery<Post[], Error>(
    'posts',
    fetchPosts,
    {
      suspense: false,
      useErrorBoundary: false,
      retry: 1,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center p-4">
        <ErrorMessage 
          message="Unable to load posts. Please try again later." 
          className="max-w-md w-full"
        />
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="min-h-[200px] flex items-center justify-center p-4">
        <ErrorMessage 
          message="No posts found" 
          className="max-w-md w-full"
        />
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}