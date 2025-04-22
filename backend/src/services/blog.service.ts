import { Blog } from "../models";
import { IBlogPost } from "../types";

export const getAllBlogs = async (): Promise<IBlogPost[]> => {
    return Blog.find().sort({ createdAt: -1 });
};

export const getBlogById = async (id: string): Promise<IBlogPost | null> => {
    return Blog.findById(id);
};

export const createBlog = async (blogData: IBlogPost): Promise<IBlogPost> => {
    const blog = new Blog(blogData);
    return blog.save();
};

export const updateBlog = async (
    id: string,
    blogData: Partial<IBlogPost>
): Promise<IBlogPost | null> => {
    return Blog.findByIdAndUpdate(id, blogData, { new: true });
};

export const deleteBlog = async (id: string): Promise<boolean> => {
    const result = await Blog.findByIdAndDelete(id);
    return !!result;
};
