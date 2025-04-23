import { Request, Response } from "express";
import {Mentor, Otp} from "../models"; 
import { sendEmailFn } from "../utils";

export const mentorSignup = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password, dateOfBirth, country, rollNo, branch, year, skills, idCard, college, bio, profilePicture, gender } = req.body;

        const existingEmail = await Mentor.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: "Mentor already exists with this email" });

        const existingPhone = await Mentor.findOne({ phone });
        if (existingPhone) return res.status(400).json({ message: "Mentor already exists with this phone number" });

        const newMentor = new Mentor({ name, email, phone, password, dateOfBirth, country, rollNo, branch, year, skills, idCard, college, bio, profilePicture, gender });
        await newMentor.save();

        const token = await newMentor.generateToken();
        if (!token) return res.status(500).json({ message: "Error generating token" });

        res.status(201).json({
            message: "Mentor account created successfully",
            mentor: {
                id: newMentor._id,
                name: newMentor.name,
                email: newMentor.email,
                age: newMentor.age,
                wallet: newMentor.wallet,
            },
            token,
        });
    } catch (error) {
        console.error("Mentor signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const mentorLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const mentor = await Mentor.findOne({ email });
        if (!mentor) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await mentor.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = await mentor.generateToken();
        if (!token) return res.status(500).json({ message: "Error generating token" });

        res.status(200).json({
            message: "Login successful",
            mentor: {
                id: mentor._id,
                name: mentor.name,
                email: mentor.email,
                age: mentor.age,
                wallet: mentor.wallet,
            },
            token,
        });
    } catch (error) {
        console.error("Mentor login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const mentorResetPassword = async (req: Request, res: Response) => {
    try {
        const { email, newPassword, otp } = req.body;

        if (!email || !newPassword || !otp) return res.status(400).json({ message: "Email, new password, and OTP are required" });

        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord || otpRecord.expiresAt < new Date()) return res.status(400).json({ message: "Invalid or expired OTP" });

        const mentor = await Mentor.findOne({ email }).select("+password");
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        mentor.password = newPassword;
        await mentor.save();

        await Otp.deleteOne({ _id: otpRecord._id });

        const token = await mentor.generateToken();
        if (!token) return res.status(500).json({ message: "Error generating token" });

        res.status(200).json({
            message: "Password reset successful",
            mentor: {
                id: mentor._id,
                name: mentor.name,
                email: mentor.email,
                age: mentor.age,
                wallet: mentor.wallet,
            },
            token,
        });
    } catch (error) {
        console.error("Mentor reset password error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const sendMentorOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Email is required" });

        const mentor = await Mentor.findOne({ email });
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        await Otp.deleteMany({ email });

        await Otp.create({ email, otp, expiresAt });

        const subject = "Your OTP Code for LoveTalks (Mentor)";
        const msg = `<h3>Your OTP Code is:</h3><p style="font-size: 18px; font-weight: bold;">${otp}</p><p>This code is valid for 10 minutes.</p>`;

        await sendEmailFn({ email, subject, msg });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Send OTP error:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};
