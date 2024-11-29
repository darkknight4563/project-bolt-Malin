import axios, { AxiosError } from 'axios';
import type { Post, Resource, Therapist, Testimonial } from '../types/strapi';

const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL;
const UPLOADS_URL = import.meta.env.VITE_STRAPI_UPLOADS_URL;

if (!STRAPI_URL || !UPLOADS_URL) {
  console.error('Missing required environment variables');
}

const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }

    const message = error.response?.data?.error?.message || 'An unexpected error occurred';
    throw new Error(message);
  }
);

// Helper function to format image URLs
export const getStrapiImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${UPLOADS_URL}${url}`;
};

// Mock data for development
const mockPosts: Post[] = [
  {
    id: 1,
    attributes: {
      title: "Understanding Anxiety",
      slug: "understanding-anxiety",
      content: "Anxiety is a natural response to stress...",
      excerpt: "Learn about the causes and management of anxiety.",
      createdAt: new Date().toISOString(),
      featuredImage: {
        data: {
          attributes: {
            url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1800"
          }
        }
      },
      author: {
        data: {
          attributes: {
            name: "Dr. Sarah Johnson",
            avatar: {
              data: {
                attributes: {
                  url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                }
              }
            }
          }
        }
      },
      category: {
        data: {
          attributes: {
            name: "Mental Health",
            slug: "mental-health"
          }
        }
      }
    }
  }
];

// Posts API
export const fetchPosts = async (): Promise<Post[]> => {
  // Use mock data if API is not available
  if (!STRAPI_URL) {
    return Promise.resolve(mockPosts);
  }

  try {
    const { data } = await api.get('/posts?populate=*');
    return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPost = async (slug: string): Promise<Post> => {
  if (!STRAPI_URL) {
    const post = mockPosts.find(p => p.attributes.slug === slug);
    if (!post) throw new Error('Post not found');
    return Promise.resolve(post);
  }

  try {
    const { data } = await api.get(`/posts/${slug}?populate=*`);
    return data.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// Resources API
export const fetchResources = async (): Promise<Resource[]> => {
  if (!STRAPI_URL) {
    return Promise.resolve([]);
  }

  try {
    const { data } = await api.get('/resources?populate=*');
    return data.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

// Therapists API
export const fetchTherapists = async (): Promise<Therapist[]> => {
  if (!STRAPI_URL) {
    return Promise.resolve([]);
  }

  try {
    const { data } = await api.get('/therapists?populate=*');
    return data.data;
  } catch (error) {
    console.error('Error fetching therapists:', error);
    throw error;
  }
};

// Testimonials API
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  if (!STRAPI_URL) {
    return Promise.resolve([]);
  }

  try {
    const { data } = await api.get('/testimonials?populate=*');
    return data.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

export default api;