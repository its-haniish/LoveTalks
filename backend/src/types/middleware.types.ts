import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken"); // Using require() for CommonJS

// Extend Express Request interface to include user data
export interface AuthRequest extends Request {
    user?: string | typeof jwt.JwtPayload;
}

// Type for authentication middleware function
export type AuthMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => void;
