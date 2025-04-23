import { Request, Response } from 'express';
import { blogService } from '../services';

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

export const createBlog = async (req: Request, res: Response) => {
    try {
        const newBlog = await blogService.createBlog(req.body);
        res.status(201).json(newBlog);
    } catch (err: any) {
        res.status(400).json({ error: 'Error creating blog', message: err.message || 'Unknown error' });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const updatedBlog = await blogService.updateBlog(req.params.id, req.body);
        if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.json(updatedBlog);
    } catch (err: any) {
        res.status(400).json({ error: 'Error updating blog', message: err.message || 'Unknown error' });
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