import express from "express";
import * as blogController from "../controllers/blog.controllers";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.get("/:slug", asyncHandler(blogController.getBlogBySlug));
router.post("/", asyncHandler(blogController.createBlog));
router.put("/:id", asyncHandler(blogController.updateBlog));
router.delete("/:id", asyncHandler(blogController.deleteBlog));

export default router;