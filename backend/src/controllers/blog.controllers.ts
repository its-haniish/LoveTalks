import { Request, Response } from 'express';
import { Blog } from '../models';
import { BlogPostInput } from '../validators';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ message: 'Blogs fetched successfully', blogs });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json({ message: 'Blog fetched successfully', blog });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching blog' });
    }
};

export const createBlog = async (req: Request, res: Response) => {
    try {
        const blogData: BlogPostInput = req.body;
        const rootDir = path.resolve(__dirname, '../../');
        // Directly use the slug provided by the frontend
        const slug = blogData.slug;

        // Base directory paths
        const baseDir = path.join(rootDir, 'uploads', 'blogs', slug);
        const featuredImageDir = path.join(baseDir, 'featuredImage');
        const contentImagesDir = path.join(baseDir, 'images');

        // Ensure directories exist
        fs.mkdirSync(featuredImageDir, { recursive: true });
        fs.mkdirSync(contentImagesDir, { recursive: true });

        // === Handle Featured Image ===
        const featuredBase64 = blogData.featuredImage;
        const featuredMatch = featuredBase64.match(/^data:(.+);base64,(.+)$/);
        if (!featuredMatch || featuredMatch.length !== 3) {
            return res.status(400).json({ error: 'Invalid featured image format' });
        }

        const featuredBuffer = Buffer.from(featuredMatch[2], 'base64');
        const featuredPath = path.join(featuredImageDir, 'featured.png');

        await sharp(featuredBuffer).png().toFile(featuredPath);
        blogData.featuredImage = path.join('uploads', 'blogs', slug, 'featuredImage', 'featured.png');

        // === Handle Images Inside Contents ===
        let imageCounter = 1;
        blogData.content = blogData.content.map((item: any) => {
            if (item.type === 'image' && item.value?.startsWith('data:image')) {
                const match = item.value.match(/^data:(.+);base64,(.+)$/);
                if (match && match.length === 3) {
                    const buffer = Buffer.from(match[2], 'base64');
                    const imagePath = path.join(contentImagesDir, `${imageCounter}.png`);
                    sharp(buffer).png().toFile(imagePath); // Don't await for parallel processing
                    const relativePath = path.join('uploads', 'blogs', slug, 'images', `${imageCounter}.png`);
                    imageCounter++;

                    // Update the item value with the relative path to the stored image
                    return { ...item, value: relativePath };
                }
            }
            return item;
        });

        // === Save the Blog Data ===
        const blog = new Blog(blogData);
        const newBlog = await blog.save();

        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (err: any) {
        console.error(err);
        res.status(400).json({
            error: 'Error creating blog',
            message: err.message || 'Unknown error',
        });
    }
};


export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogData: BlogPostInput = req.body;
        const slug = blogData.slug;
        const rootDir = path.resolve(__dirname, '../../');

        const baseDir = path.join(rootDir, 'uploads', 'blogs', slug);
        const featuredImageDir = path.join(baseDir, 'featuredImage');
        const contentImagesDir = path.join(baseDir, 'images');

        // Delete previous image folder and files if they exist
        const prevFolder = path.join(rootDir, 'uploads', 'blogs', req.params.slug);
        if (prevFolder) {
            fs.rmSync(prevFolder, { recursive: true, force: true }); // Delete all previous images and folder
        }

        // Ensure directories exist
        fs.mkdirSync(featuredImageDir, { recursive: true });
        fs.mkdirSync(contentImagesDir, { recursive: true });

        // === Handle Featured Image ===
        if (blogData.featuredImage?.startsWith('data:image')) {
            const featuredMatch = blogData.featuredImage.match(/^data:(.+);base64,(.+)$/);
            if (!featuredMatch || featuredMatch.length !== 3) {
                return res.status(400).json({ error: 'Invalid featured image format' });
            }

            const featuredBuffer = Buffer.from(featuredMatch[2], 'base64');
            const featuredPath = path.join(featuredImageDir, 'featured.png');

            await sharp(featuredBuffer).png().toFile(featuredPath);
            blogData.featuredImage = path.join('uploads', 'blogs', slug, 'featuredImage', 'featured.png');
        }

        // === Handle Images Inside Contents ===
        let imageCounter = 1;
        blogData.content = blogData.content.map((item: any) => {
            if (item.type === 'image' && item.value?.startsWith('data:image')) {
                const match = item.value.match(/^data:(.+);base64,(.+)$/);
                if (match && match.length === 3) {
                    const buffer = Buffer.from(match[2], 'base64');
                    const imagePath = path.join(contentImagesDir, `${imageCounter}.png`);
                    sharp(buffer).png().toFile(imagePath);
                    const relativePath = path.join('uploads', 'blogs', slug, 'images', `${imageCounter}.png`);
                    imageCounter++;
                    return { ...item, value: relativePath };
                }
            }
            return item;
        });

        // === Update Blog in DB ===
        const updatedBlog = await Blog.findOneAndUpdate({ slug: req.params.slug }, blogData, { new: true });
        if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });

        res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (err: any) {
        console.error(err);
        res.status(400).json({
            error: 'Error updating blog',
            message: err.message || 'Unknown error',
        });
    }
};


export const deleteBlog = async (req: Request, res: Response) => {
    try {
        // Find and delete the blog
        const result = await Blog.findOneAndDelete({ slug: req.params.slug });

        if (!result) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const rootDir = path.resolve(__dirname, '../../');
        const prevFolder = path.join(rootDir, 'uploads', 'blogs', req.params.slug);

        // Delete the blog folder and images if it exists
        if (fs.existsSync(prevFolder)) {
            fs.rmSync(prevFolder, { recursive: true, force: true });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting blog' });
    }
};

