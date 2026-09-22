// TypeScript interfaces defining domain models across the website.
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
