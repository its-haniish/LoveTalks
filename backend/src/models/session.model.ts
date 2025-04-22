import mongoose, { Schema } from "mongoose";
import { ISession } from "../types";

const sessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    durationInMinutes: { type: Number },
    status: {
      type: String,
      enum: ["pending", "active", "completed", "cancelled"],
      default: "pending",
    },
    sessionType: {
      type: String,
      enum: ["call", "chat"],
      required: true,
    },
    messages: {
      type: [
        {
          sender: { type: String, enum: ["user", "mentor"], required: true },
          message: { type: String, required: true },
          timestamp: { type: Date, default: Date.now },
        },
      ],
      validate: {
        validator: function (this: ISession, messages: ISession["messages"]) {
          if (this.sessionType === "call" && messages && messages.length > 0) {
            return false;
          }
          return true;
        },
        message: "Messages are only allowed in chat sessions.",
      },
    },
    coinsSpent: { type: Number, default: 0 },
    coinsEarned: { type: Number, default: 0 },
    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISession>("Session", sessionSchema);
