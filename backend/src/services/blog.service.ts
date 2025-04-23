import { Blog } from "../models";
import { IBlogPost } from "../types";
import { BlogPostInput, UpdateBlogPost } from "../validators";

export const getAllBlogs = async (): Promise<IBlogPost[]> => {
    return Blog.find().sort({ createdAt: -1 });
};

export const getBlogBySlug = async (slug: string): Promise<IBlogPost | null> => {
    return Blog.findOne({ slug });
};

export const createBlog = async (blogData: BlogPostInput): Promise<IBlogPost> => {
    const blog = new Blog(blogData);
    return blog.save();
};

export const updateBlog = async (
    id: string,
    blogData: UpdateBlogPost
): Promise<IBlogPost | null> => {
    return Blog.findByIdAndUpdate(id, blogData, { new: true });
};

export const deleteBlog = async (id: string): Promise<boolean> => {
    const result = await Blog.findByIdAndDelete(id);
    return !!result;
};