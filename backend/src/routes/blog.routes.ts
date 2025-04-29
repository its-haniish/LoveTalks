import express from "express";
import * as blogController from "../controllers";
import { asyncHandler, validate } from "../middlewares";
import { blogPostSchema } from "../validators";

const router = express.Router();

router.get("/", asyncHandler(blogController.getAllBlogs));
router.get("/:slug", asyncHandler(blogController.getBlogBySlug));

// ✅ Add schema validation middleware here
router.post("/", asyncHandler(validate(blogPostSchema)), asyncHandler(blogController.createBlog));
router.put("/:slug", asyncHandler(validate(blogPostSchema)), asyncHandler(blogController.updateBlog));

router.delete("/:slug", asyncHandler(blogController.deleteBlog));

export default router;
