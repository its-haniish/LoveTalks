import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.routes";
import socketHandler from "./utils/socket";
import connectDB from "./utils/connectDB";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

// Create HTTP server
const httpServer = createServer(app);

// Set up Socket.IO server
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

// Apply Socket.IO logic
socketHandler(io);

// Middleware
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.json({ limit: "50mb" }));
app.use("/api/blogs", blogRoutes);

// Test Route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from TypeScript Backend!");
});

// Connect to DB and start server
connectDB(MONGO_URI).then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
