import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISession extends Document {
  userId: Types.ObjectId;
  mentorId: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  durationInMinutes?: number;
  status: "pending" | "active" | "completed" | "cancelled";
  messages?: {
    sender: "user" | "mentor";
    message: string;
    timestamp: Date;
  }[];
  coinsSpent: number;
  coinsEarned: number;
  feedback?: {
    rating: number; // 1-5
    comment?: string;
  };
}

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
    messages: [
      {
        sender: { type: String, enum: ["user", "mentor"], required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
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
