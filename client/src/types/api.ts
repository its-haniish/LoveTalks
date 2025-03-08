export type User = {
    id: string;
    name: string;
    email: string;
    profilePic?: string;
};

export type ChatMessage = {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: string;
};
