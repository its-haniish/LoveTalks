import { Request, Response } from 'express';
import { blogService } from '../services';
import { blogPostSchema, updateBlogPostSchema, BlogPostInput, UpdateBlogPost } from '../validators';
import { z } from 'zod';

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
    try {
        const blog = await blogService.getBlogBySlug(req.params.slug);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching blog' });
    }
};

export const createBlogController = async (req: Request, res: Response) => {
    try {
        // Validate the request body using Zod
        const validatedData: BlogPostInput = blogPostSchema.parse(req.body);  // Will throw if invalid

        // Call the service to create the blog
        const newBlog = await blogService.createBlog(validatedData);

        // Return the newly created blog post in the response
        res.status(201).json(newBlog);
    } catch (err: unknown) {
        // If validation fails, return a 400 response with error details
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation failed', details: err.errors });
        }

        // For other errors (like DB-related or service issues), return a 400 response
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(400).json({ error: 'Error creating blog', message: errorMessage });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        // Validate the request body using Zod (for updates)
        const validatedData: UpdateBlogPost = updateBlogPostSchema.parse(req.body); // Will throw if invalid

        const updatedBlog = await blogService.updateBlog(req.params.id, validatedData);
        if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.json(updatedBlog);
    } catch (err: unknown) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation failed', details: err.errors });
        }
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(400).json({ error: 'Error updating blog', message: errorMessage });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const success = await blogService.deleteBlog(req.params.id);
        if (!success) return res.status(404).json({ error: 'Blog not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
};