import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import blogRoutes from './routes/blog.routes';

const app = express();
const PORT = 5000;

// Create HTTP server
const httpServer = createServer(app);

// Set up Socket.IO server
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all origins or set to your client URL
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRoutes);

// Test Route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from TypeScript Backend!");
});

// Socket.IO connection
io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log(`Received message: ${data}`);
        // Echo the message back
        socket.emit("message", `Server received: ${data}`);
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Start HTTP server (not app.listen anymore)
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});