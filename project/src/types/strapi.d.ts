export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
    };
  };
}

export interface Post {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: StrapiImage;
    author: {
      data: {
        id: number;
        attributes: {
          name: string;
          avatar: StrapiImage;
        };
      };
    };
    category: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface Therapist {
  id: number;
  attributes: {
    name: string;
    title: string;
    bio: string;
    specialties: string[];
    avatar: StrapiImage;
    education: string[];
    certifications: string[];
    availability: {
      days: string[];
      hours: string;
    };
  };
}

export interface Resource {
  id: number;
  attributes: {
    title: string;
    description: string;
    type: 'article' | 'video' | 'audio' | 'worksheet';
    content: string;
    thumbnail: StrapiImage;
    downloadUrl?: string;
    category: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    content: string;
    rating: number;
    avatar?: StrapiImage;
    occupation?: string;
  };
}