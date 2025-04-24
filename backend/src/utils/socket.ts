import { Server, Socket } from "socket.io";
import { ChatSession, CallSession, Mentor } from "../models";  // Import your models
import { MessagePayload } from "../types";  // Assuming you have this type

export default function socketHandler(io: Server): void {
    io.on("connection", (socket: Socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Inside your "start chat session" socket handler
        socket.on("start chat session", async (data: { userId: string, mentorId: string, durationInMinutes?: number }) => {
            try {
                if (!data.durationInMinutes || data.durationInMinutes <= 0) {
                    return socket.emit("error", "Invalid or missing session duration.");
                }

                const chatSession = new ChatSession({
                    userId: data.userId,
                    mentorId: data.mentorId,
                    durationInMinutes: data.durationInMinutes,
                    status: "active",
                    startTime: new Date(),
                    messages: [],
                });

                const mentor = await Mentor.findById(data.mentorId);
                if (!mentor) {
                    return socket.emit("error", "Mentor not found");
                }

                chatSession.sessionPrice = mentor.pricePerMinute * data.durationInMinutes;
                chatSession.endTime = new Date(new Date().getTime() + data.durationInMinutes * 60 * 1000);

                await chatSession.save();

                socket.emit("session started", chatSession);
                io.to(data.mentorId).emit("session started", chatSession);

                console.log(`Chat session started: ${chatSession._id}`);

                const checkInterval = setInterval(async () => {
                    const session = await ChatSession.findById(chatSession._id);
                    if (!session || session.status === "completed") {
                        clearInterval(checkInterval);
                        return;
                    }

                    const now = new Date().getTime();
                    const start = session.startTime.getTime();
                    const limit = (session.durationInMinutes || 0) * 60 * 1000;

                    if (now - start >= limit) {
                        session.status = "completed";
                        session.endTime = new Date();

                        const duration = (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60);
                        session.durationInMinutes = Math.round(duration);

                        await session.save();

                        io.to(data.userId).emit("chat session expired", { sessionId: session._id });
                        io.to(data.mentorId).emit("chat session expired", { sessionId: session._id });

                        clearInterval(checkInterval);
                        console.log(`Chat session expired via interval: ${session._id}`);
                    }
                }, 10000);

            } catch (err) {
                console.error("Error starting chat session:", err);
                socket.emit("error", "Error starting chat session");
            }
        });



        // Handle creating a new call session
        socket.on("start call session", async (data: { userId: string, mentorId: string }) => {
            try {
                const callSession = new CallSession({
                    userId: data.userId,
                    mentorId: data.mentorId,
                    status: "active",
                    startTime: new Date(),
                    sessionPrice: 0,
                });

                await callSession.save();

                // Emit to the user and mentor that the session has started
                socket.emit("session started", callSession);
                io.to(data.mentorId).emit("session started", callSession);

                console.log(`Call session started: ${callSession._id}`);
            } catch (err) {
                console.error("Error starting call session:", err);
                socket.emit("error", "Error starting call session");
            }
        });

        // Handle sending messages during a chat session
        socket.on("send message", async (data: MessagePayload) => {
            const { sessionId, senderType, message } = data;

            try {
                // Find the chat session by ID
                const chatSession = await ChatSession.findById(sessionId);

                if (!chatSession) {
                    return socket.emit("error", "Chat session not found");
                }

                // Add the new message to the session
                chatSession.messages.push({
                    sender: senderType,
                    message,
                    timestamp: new Date(),
                });


                // Save the updated session
                await chatSession.save();

                // Emit the message to both parties (user and mentor)
                senderType === "mentor" ?
                    io.to(chatSession.userId.toString()).emit("new message", { message }) :
                    io.to(chatSession.mentorId.toString()).emit("new message", { message });

                console.log(`Message sent in chat session: ${message}`);
            } catch (err) {
                console.error("Error sending message:", err);
                socket.emit("error", "Error sending message");
            }
        });

        // Handle ending a session
        socket.on("end session", async (sessionId: string) => {
            try {
                const chatSession = await ChatSession.findById(sessionId);

                if (!chatSession) {
                    return socket.emit("error", "Chat session not found");
                }

                chatSession.status = "completed";
                chatSession.endTime = new Date();
                chatSession.durationInMinutes = Math.floor(
                    (chatSession.endTime.getTime() - chatSession.startTime.getTime()) / 60000
                );

                // Save the completed session
                await chatSession.save();

                // Emit to both user and mentor that the session has ended
                io.to(chatSession.userId.toString()).emit("session ended", chatSession);
                io.to(chatSession.mentorId.toString()).emit("session ended", chatSession);

                console.log(`Chat session ended: ${chatSession._id}`);
            } catch (err) {
                console.error("Error ending chat session:", err);
                socket.emit("error", "Error ending session");
            }
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
