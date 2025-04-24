import mongoose, { Schema } from "mongoose";
import { IOtp } from "../types";

const OtpSchema = new Schema<IOtp>(
    {
        email: { type: String, required: true },
        otp: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

// Automatically delete expired OTPs
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IOtp>("Otp", OtpSchema);
