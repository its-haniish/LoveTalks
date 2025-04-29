import { Document, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: Date;
    country: string;
    age: number;
    password: string;
    wallet: {
        coinBalance: number;
        coinTransactionHistory: {
            _id?: Types.ObjectId;
            coins: number;
            date: Date;
            type: "earned" | "spent" | "purchased";
            sessionId?: string;
            description?: string;
        }[];
    };
    comparePassword(password: string): Promise<boolean>;
    generateToken(): Promise<string | null>;
}

export interface IMentor extends Document {
    name: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: Date;
    country: string;
    age: number;
    rollNo: string;
    branch: string;
    year: string;
    skills: string[];
    experience?: number;
    idCard: string;
    isVerified: boolean;
    pricePerMinute: number;
    isAvailable: boolean;
    isOnline: boolean;
    college: string;
    bio: string;
    profilePicture: string;
    password: string;
    wallet: {
        coinBalance: number;
        coinTransactionHistory: {
            _id?: Types.ObjectId;
            coins: number;
            date: Date;
            type: "earned" | "withdrawn";
            sessionId?: string;
            description?: string;
        }[];
    };
    comparePassword(password: string): Promise<boolean>;
    generateToken(): Promise<string | null>;
}

export interface IChatMessage {
    sender: "user" | "mentor";
    message: string;
    timestamp?: Date;
}

export interface IChatSession extends Document {
    userId: Types.ObjectId;
    mentorId: Types.ObjectId;
    startTime: Date;
    endTime?: Date;
    durationInMinutes?: number;
    status: "active" | "completed";
    messages: IChatMessage[];
    sessionPrice: number;
    feedback?: {
        rating?: number;
        comment?: string;
    };
}



export interface ICallSession extends Document {
    userId: Types.ObjectId;
    mentorId: Types.ObjectId;
    startTime: Date;
    endTime?: Date;
    durationInMinutes?: number;
    status: "active" | "completed";
    sessionPrice: number;
    feedback?: {
        rating?: number;
        comment?: string;
    };
}


export interface IContentBlock {
    type: 'heading' | 'image' | 'paragraph';
    value: string;
}

export interface IBlogPostInput {
    title: string;
    slug: string;
    featuredImage: string;
    content: IContentBlock[];
}

export interface IBlogPost extends IBlogPostInput, Document {
    createdAt: Date;
    updatedAt: Date;
}


export interface IOtp extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
}
