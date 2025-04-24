export interface MessagePayload {
    sessionId: string;
    senderId: string;
    senderType: "user" | "mentor";
    receiverId: string;
    message: string;
    timestamp: Date;
}
