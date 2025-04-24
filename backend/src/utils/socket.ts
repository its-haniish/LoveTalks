import { Server, Socket } from "socket.io";
import { ChatSession, CallSession, Mentor, User } from "../models";  // Import your models
import { MessagePayload } from "../types";  // Assuming you have this type
import { Worker } from "worker_threads";
import path from "path";

export default function socketHandler(io: Server): void {
    io.on("connection", (socket: Socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Inside your "start chat session" socket handler
        socket.on("start chat session", async (data: { userId: string, mentorId: string, durationInMinutes?: number }) => {
            try {
                if (typeof data.durationInMinutes !== "number" || data.durationInMinutes <= 0) {
                    return socket.emit("error", "Invalid or missing session duration.");
                }

                // Check if the user is already in a session
                const existingSession = await ChatSession.findOne({
                    userId: data.userId,
                    status: "active",
                });

                if (existingSession) {
                    return socket.emit("session error", { type: "USER_SESSION_ACTIVE", message: "User is already in an active chat session." });
                }

                // Check if the user is already in a call session
                const existingCallSession = await CallSession.findOne({
                    userId: data.userId,
                    status: "active",
                });
                if (existingCallSession) {
                    return socket.emit("session error", { type: "USER_CALL_SESSION_ACTIVE", message: "User is already in an active call session." });
                }


                // Check if the mentor is already in a session
                const mentorSession = await ChatSession.findOne({
                    mentorId: data.mentorId,
                    status: "active",
                });
                if (mentorSession) {
                    return socket.emit("session error", { type: "MENTOR_SESSION_ACTIVE", message: "Mentor is already in an active chat session." });
                }

                // Check if the mentor is already in a call session
                const mentorCallSession = await CallSession.findOne({
                    mentorId: data.mentorId,
                    status: "active",
                });

                if (mentorCallSession) {
                    return socket.emit("session error", { type: "MENTOR_CALL_SESSION_ACTIVE", message: "Mentor is already in an active call session." });
                }

                // Check if the user have enough balance
                const user = await User.findById(data.userId);
                if (!user) {
                    return socket.emit("session error", { type: "USER_NOT_FOUND", message: "User not found." });
                }

                const mentor = await Mentor.findById(data.mentorId);
                if (!mentor) {
                    return socket.emit("session error", { type: "MENTOR_NOT_FOUND", message: "Mentor not found." });
                }

                const sessionPrice = mentor.pricePerMinute * data.durationInMinutes;

                // Check if the user has enough balance
                if (user.wallet.coinBalance < sessionPrice) {
                    return socket.emit("session error", { type: "INSUFFICIENT_BALANCE", message: "User has insufficient balance." });
                }

                // Create and save the chat session
                const chatSession = new ChatSession({
                    userId: data.userId,
                    mentorId: data.mentorId,
                    durationInMinutes: data.durationInMinutes,
                    status: "active",
                    startTime: new Date(),
                    messages: [],
                }) as typeof ChatSession.prototype;

                // Calculate session price based on mentor's price per minute
                chatSession.sessionPrice = sessionPrice;
                chatSession.endTime = new Date(Date.now() + data.durationInMinutes * 60 * 1000); // Calculate end time

                await chatSession.save();

                // Deduct the session price from user's wallet
                user.wallet.coinBalance -= sessionPrice;
                user.wallet.coinTransactionHistory.push({
                    coins: - sessionPrice,
                    date: new Date(),
                    type: "spent",
                    description: `Chat session with mentor ${data.mentorId}`,
                    sessionId: chatSession._id.toString(),
                });

                await user.save();

                // Add the session to the mentor's wallet
                mentor.wallet.coinBalance += sessionPrice;
                mentor.wallet.coinTransactionHistory.push({
                    coins: sessionPrice,
                    date: new Date(),
                    type: "earned",
                    description: `Chat session with user ${data.userId}`,
                    sessionId: chatSession._id.toString(),
                });

                await mentor.save();

                // Emit to the user and mentor that the session has started
                socket.emit("session started", chatSession);
                io.to(data.mentorId).emit("session started", chatSession);

                console.log(`Chat session started: ${chatSession._id}`);

                // ✅ Start the background worker to handle session expiry at the right time
                const worker = new Worker(path.resolve(__dirname, "../workers/sessionExpireWorker.js"));

                worker.postMessage({
                    sessionId: chatSession._id.toString(),
                    userId: data.userId,
                    mentorId: data.mentorId,
                    endTime: chatSession.endTime // Send the actual end time to the worker
                });

                // When worker tells us session is expired, emit to user and mentor
                worker.on("message", ({ sessionId, userId, mentorId }) => {
                    io.to(userId).emit("chat session expired", { sessionId });
                    io.to(mentorId).emit("chat session expired", { sessionId });
                    console.log(`Chat session expired (worker): ${sessionId}`);
                });

                worker.on("error", (error) => {
                    console.error("Worker error:", error);
                });

                worker.on("exit", (code) => {
                    if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
                });

            } catch (err) {
                console.error("Error starting chat session:", err);
                socket.emit("error", "Error starting chat session");
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

                if (chatSession.status === "completed") {
                    socket.emit("chat error", { type: "SESSION_ENDED", message: "Chat session has already ended" });
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
                socket.emit("chat error", {type: "SEND_MESSAGE_ERROR", message: "Error sending message"});
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
                socket.emit("error", {type: "CALL_SESSION_ERROR", message: "Error starting call session"});
            }
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
