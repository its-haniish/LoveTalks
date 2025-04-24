import { Request, Response } from 'express';
import { Blog } from '../models';
import { BlogPostInput, UpdateBlogPost } from '../validators';

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching blog' });
    }
};

export const createBlog = async (req: Request, res: Response) => {
    try {
        const blogData: BlogPostInput = req.body;
        const blog = new Blog(blogData);
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err: any) {
        res.status(400).json({ error: 'Error creating blog', message: err.message || 'Unknown error' });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body as UpdateBlogPost, {
            new: true,
        });
        if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.json(updatedBlog);
    } catch (err: any) {
        res.status(400).json({ error: 'Error updating blog', message: err.message || 'Unknown error' });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const result = await Blog.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ error: 'Blog not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
};
