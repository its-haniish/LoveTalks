import { Server, Socket } from "socket.io";
import { MessagePayload } from "../types";

export default function socketHandler(io: Server): void {
    io.on("connection", (socket: Socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("message", (data: MessagePayload) => {
            console.log(`Received message: ${data}`);
            socket.emit("message", `Server received: ${data}`);
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
