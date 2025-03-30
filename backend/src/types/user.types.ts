import { Document } from "mongoose";

export interface ITransaction {
    amount: number;
    date: Date;
    status: "success" | "failed" | "pending";
    transactionId: string;
    razorpayPaymentId: string;
}

export interface ICoinTransaction {
    coins: number;
    date: Date;
    type: "earned" | "spent" | "purchased";
    description?: string;
}

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    paymentInfo: {
        paymentMethod: "card" | "paypal" | "upi" | "wallet";
        transactionHistory: ITransaction[];
    };
    wallet: {
        coinBalance: number;
        coinTransactionHistory: ICoinTransaction[];
    };
    createdAt: Date;
    updatedAt: Date;
}
