import mongoose, { Schema } from "mongoose";
import { IContentBlock, IBlogPost } from "../types";

const contentBlockSchema = new Schema<IContentBlock>(
    {
        type: {
            type: String,
            enum: ["heading", "image", "paragraph"],
            required: true,
        },
        value: { type: String, required: true },
    },
    { _id: false }
);

const blogPostSchema = new Schema<IBlogPost>(
    {
        title: { type: String, required: true },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: [contentBlockSchema],
            required: true,
            validate: {
                validator: (blocks: IContentBlock[]) => blocks.length > 0,
                message: "Content must have at least one block.",
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBlogPost>("Blog", blogPostSchema);