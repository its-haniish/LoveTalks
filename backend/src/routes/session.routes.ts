import express from "express";
import { getAllChatSessions } from "../controllers";
import { asyncHandler, validate } from "../middlewares";
import { getAllChatSessionsSchema } from "../validators";

const router = express.Router();

router.get("/chat-sessions", asyncHandler(validate(getAllChatSessionsSchema)), asyncHandler(getAllChatSessions));

export default router;
