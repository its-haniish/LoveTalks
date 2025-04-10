import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types";

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        phone: { type: String, required: true, unique: true },
        dateOfBirth: { type: Date, required: true },
        country: { type: String, required: true },
        age: { type: Number },
        password: { type: String, required: true },
        wallet: {
            coinBalance: { type: Number, default: 0 },
            coinTransactionHistory: [
                {
                    coins: { type: Number, required: true },
                    _id: { type: Types.ObjectId, auto: true },
                    date: { type: Date, default: Date.now },
                    type: { type: String, enum: ["earned", "spent", "purchased"], required: true },
                    description: { type: String },
                    transactionId: { type: String },
                    isCompleted: { type: Boolean, default: false },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
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

// Save age before saving
UserSchema.pre<IUser>("save", function (next) {
    if (!this.isModified("dateOfBirth")) return next(); // Calculate age only if dateOfBirth is modified

    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    this.age = age;
    next();

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

export default mongoose.model<IUser>("User", UserSchema);
