import { Response, NextFunction } from "express";
const jwt = require("jsonwebtoken"); // Using require() for CommonJS
import { AuthRequest } from "../types"

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.user = decoded;
        console.log("Token verified successfully");
        next();
    } catch (error) {
        console.log("Forbidden");
        return res.status(403).json({ message: "Forbidden" });
    }
};

export default authenticateToken;
