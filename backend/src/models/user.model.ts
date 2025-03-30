import mongoose, { Schema, Document } from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
    
export interface User extends Document {
    name: string;
    email: string;
    password: string;
    paymentInfo: {
        paymentMethod: "card" | "paypal" | "upi" | "wallet";
        transactionHistory: {
            amount: number;
            date: Date;
            status: "success" | "failed" | "pending";
            transactionId: string;
            razorpayPaymentId: string;
        }[];
    };
    wallet: {
        coinBalance: number;
        coinTransactionHistory: {
            coins: number;
            date: Date;
            type: "earned" | "spent" | "purchased";
            description?: string;
        }[];
    };
    comparePassword(password: string): Promise<boolean>;
    generateToken(): Promise<string | null>;
}

const UserSchema = new Schema<User>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        paymentInfo: {
            paymentMethod: { type: String, enum: ["card", "paypal", "upi", "wallet"], default: "card" },
            transactionHistory: [
                {
                    amount: { type: Number, required: true },
                    date: { type: Date, required: true },
                    status: { type: String, enum: ["success", "failed", "pending"], required: true },
                    transactionId: { type: String, required: true },
                    razorpayPaymentId: { type: String, required: true },
                },
            ],
        },
        wallet: {
            coinBalance: { type: Number, default: 0 },
            coinTransactionHistory: [
                {
                    coins: { type: Number, required: true },
                    date: { type: Date, default: Date.now },
                    type: { type: String, enum: ["earned", "spent", "purchased"], required: true },
                    description: { type: String },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre<User>("save", async function (next) {
    if (!this.isModified("password")) return next(); // Hash only if password is modified

    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Compare passwords
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Generate JWT token
UserSchema.methods.generateToken = async function (): Promise<string | null> {
    try {
        return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET_KEY as string, { expiresIn: "30d" });
    } catch (error) {
        console.error("Error generating token:", error);
        return null;
    }
};

export default mongoose.model<User>("User", UserSchema);
