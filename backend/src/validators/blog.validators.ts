import { z } from 'zod';

// Zod schema for content block
export const contentBlockSchema = z.object({
  type: z.enum(['heading', 'image', 'paragraph']),
  value: z.string().min(1),
});

// Zod schema for the blog post input
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.array(contentBlockSchema).min(1, 'Content must have at least one block'),
});

// We define these types to match our interfaces
export type BlogPostInput = z.infer<typeof blogPostSchema>;
// Ensure this matches IBlogPostInput

// Schema for updates with optional fields
export const updateBlogPostSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  content: z.array(contentBlockSchema).min(1).optional(),
});

export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;