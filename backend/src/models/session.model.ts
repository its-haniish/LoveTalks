import mongoose, { Schema } from "mongoose";
import { IChatSession, ICallSession } from "../types";

// Chat Session Schema
const chatSessionSchema = new Schema<IChatSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
    sessionPrice: { type: Number, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    durationInMinutes: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    messages: [
      {
        sender: { type: String, enum: ["user", "mentor"], required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Call Session Schema
const callSessionSchema = new Schema<ICallSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    sessionPrice: { type: Number, required: true },
    durationInMinutes: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Export both models
export const ChatSession = mongoose.model<IChatSession>("ChatSession", chatSessionSchema);
export const CallSession = mongoose.model<ICallSession>("CallSession", callSessionSchema);
