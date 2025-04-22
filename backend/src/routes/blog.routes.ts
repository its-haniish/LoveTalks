import express from "express";
import * as blogController from "../controllers/blog.controllers";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.get("/:id", asyncHandler(blogController.getBlogById));
router.post("/", blogController.createBlog);
router.put("/:id", asyncHandler(blogController.updateBlog));
router.delete("/:id", asyncHandler(blogController.deleteBlog));

export default router;