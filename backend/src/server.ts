import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from TypeScript Backend!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
