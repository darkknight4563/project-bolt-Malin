import { useQuery } from 'react-query';
import { fetchPosts, fetchPost, fetchResources, fetchTherapists, fetchTestimonials } from './api';
import type { Post, Resource, Therapist, Testimonial } from '../types/strapi';

// Posts queries
export const usePosts = () => {
  return useQuery<Post[], Error>('posts', fetchPosts, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

export const usePost = (slug: string) => {
  return useQuery<Post, Error>(
    ['post', slug],
    () => fetchPost(slug),
    {
      enabled: !!slug,
      staleTime: 1000 * 60 * 5,
      retry: 2,
    }
  );
};

// Resources queries
export const useResources = () => {
  return useQuery<Resource[], Error>('resources', fetchResources, {
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

// Therapists queries
export const useTherapists = () => {
  return useQuery<Therapist[], Error>('therapists', fetchTherapists, {
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

// Testimonials queries
export const useTestimonials = () => {
  return useQuery<Testimonial[], Error>('testimonials', fetchTestimonials, {
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};