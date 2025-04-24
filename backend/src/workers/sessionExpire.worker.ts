import { parentPort } from "worker_threads";
import { ChatSession } from "../models";

if (!parentPort) throw new Error("No parent port");

parentPort.on("message", async (data: { sessionId: string; userId: string; mentorId: string; endTime: Date | string }) => {
    const { sessionId, userId, mentorId, endTime } = data;

    const parsedEndTime = new Date(endTime);
    const now = new Date();
    const remainingTime = parsedEndTime.getTime() - now.getTime();

    if (isNaN(parsedEndTime.getTime())) {
        console.error(`Invalid endTime received for session ${sessionId}.`);
        return;
    }

    if (remainingTime <= 0) {
        console.warn(`Session ${sessionId} has already expired. Ending it now.`);
        return await expireSession(sessionId, userId, mentorId);
    }

    // Optional: prevent absurdly long timeouts (e.g., over 6 hours)
    const MAX_TIMEOUT = 1000 * 60 * 60 * 6;
    if (remainingTime > MAX_TIMEOUT) {
        console.warn(`Session ${sessionId} has an unusually long duration. Capping wait time.`);
    }

    setTimeout(() => {
        expireSession(sessionId, userId, mentorId);
    }, Math.min(remainingTime, MAX_TIMEOUT));
});

async function expireSession(sessionId: string, userId: string, mentorId: string) {
    try {
        const session = await ChatSession.findById(sessionId);
        if (!session || session.status === "completed") return;

        const now = new Date();
        session.status = "completed";
        session.endTime = now;

        const duration = (now.getTime() - session.startTime.getTime()) / (1000 * 60);
        session.durationInMinutes = Math.round(duration);

        await session.save();
        parentPort?.postMessage({ sessionId, userId, mentorId });
    } catch (err) {
        console.error(`Error expiring session ${sessionId}:`, err);
    }
}
