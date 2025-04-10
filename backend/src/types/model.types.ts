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
            transactionId?: string;
            isCompleted?: boolean;
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
    experience: string;
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
            transactionId?: string;
            isCompleted?: boolean;
            description?: string;
        }[];
    };
    comparePassword(password: string): Promise<boolean>;
    generateToken(): Promise<string | null>;
}

export interface ISession extends Document {
    userId: Types.ObjectId;
    mentorId: Types.ObjectId;
    startTime: Date;
    endTime?: Date;
    durationInMinutes?: number;
    status: "pending" | "active" | "completed" | "cancelled";
    sessionType: "chat" | "call";
    messages?: {
      sender: "user" | "mentor";
      message: string;
      timestamp: Date;
    }[];
    coinsSpent: number;
    coinsEarned: number;
    feedback?: {
      rating: number;
      comment?: string;
    };
  }
  