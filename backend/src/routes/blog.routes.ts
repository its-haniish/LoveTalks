import express from "express";
import * as blogController from "../controllers";
import { asyncHandler, validate } from "../middlewares";
import { blogPostSchema, updateBlogPostSchema } from "../validators";

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.get("/:slug", asyncHandler(blogController.getBlogBySlug));

// ✅ Add schema validation middleware here
router.post("/", asyncHandler(validate(blogPostSchema)), asyncHandler(blogController.createBlog));
router.put("/:id", asyncHandler(validate(updateBlogPostSchema)), asyncHandler(blogController.updateBlog));

router.delete("/:id", asyncHandler(blogController.deleteBlog));

export default router;
