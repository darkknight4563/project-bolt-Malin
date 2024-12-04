export type LibraryItemType = 'audio' | 'video' | 'article' | 'worksheet';

export interface LibraryItem {
  title: string;
  type: LibraryItemType;
  duration: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  author: string;
  downloadUrl?: string;
}