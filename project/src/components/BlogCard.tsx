import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getStrapiImageUrl } from '../lib/api';
import type { Post } from '../types/strapi';

interface BlogCardProps {
  post: Post;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={`/blog/${post.attributes.slug}`}
        className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-t-lg">
          <img
            src={getStrapiImageUrl(post.attributes.featuredImage.data.attributes.url)}
            alt={post.attributes.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-display font-medium text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
            {post.attributes.title}
          </h2>
          <p className="text-slate-600 mb-4 line-clamp-2">{post.attributes.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={getStrapiImageUrl(post.attributes.author.data.attributes.avatar.data.attributes.url)}
                alt={post.attributes.author.data.attributes.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {post.attributes.author.data.attributes.name}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(post.attributes.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-violet-600 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}