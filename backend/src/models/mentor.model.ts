import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IMentor } from "../types";

const mentorSchema = new Schema<IMentor>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    country: { type: String, required: true },
    age: { type: Number },
    rollNo: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    skills: { type: [String], required: true },
    idCard:{type: String, required: true},
    isVerified: {type: Boolean, default:false},
    experience: { type: Number, default: 0 },
    college: { type: String, required: true },
    bio: { type: String, required: true },
    profilePicture: { type: String, required: true },
    password: { type: String, required: true },
    pricePerMinute: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    isOnline: { type: Boolean, default: false },
    wallet: {
      coinBalance: { type: Number, default: 0 },
      coinTransactionHistory: [
        {
          _id: { type: Types.ObjectId, auto: true },
          coins: { type: Number, required: true },
          date: { type: Date, default: Date.now },
          type: { type: String, enum: ["earned", "withdrawn"], required: true },
          transactionId: { type: String },
          isCompleted: { type: Boolean, default: false },
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
mentorSchema.pre<IMentor>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Calculate age before saving
mentorSchema.pre<IMentor>("save", function (next) {
  if (!this.isModified("dateOfBirth")) return next();
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  this.age = age;
  next();
});

// Compare passwords
mentorSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
mentorSchema.methods.generateToken = async function (): Promise<string | null> {
  try {
    return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET_KEY as string, { expiresIn: "30d" });
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

export default mongoose.model<IMentor>("Mentor", mentorSchema);
