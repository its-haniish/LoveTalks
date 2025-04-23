import { Request, Response } from "express";
import { User, Otp } from "../models";
import { sendEmailFn } from "../utils";

export const userSignup = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password, dateOfBirth, country } = req.body;

        // Check if user already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: "User already exists with this phone number" });
        }

        const newUser = new User({ name, email, phone, password, dateOfBirth, country });
        await newUser.save();

        const token = await newUser.generateToken();
        if (!token) {
            return res.status(500).json({ message: "Error generating token" });
        }

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                wallet: newUser.wallet,
            },
            token,
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await user.generateToken();
        if (!token) {
            return res.status(500).json({ message: "Error generating token" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                wallet: user.wallet,
            },
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const resetUserPassword = async (req: Request, res: Response) => {
    try {
        const { email, newPassword, otp } = req.body;

        if (!email || !newPassword || !otp) {
            return res.status(400).json({ message: "Email, new password, and OTP are required" });
        }

        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = newPassword;
        await user.save();

        // Delete used OTP
        await Otp.deleteOne({ _id: otpRecord._id });

        const token = await user.generateToken();
        if (!token) {
            return res.status(500).json({ message: "Error generating token" });
        }

        return res.status(200).json({
            message: "Password reset successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                wallet: user.wallet,
            },
            token,
        });

    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const sendUserOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Remove previous OTPs
        await Otp.deleteMany({ email });

        // Save new OTP
        await Otp.create({ email, otp, expiresAt });

        const subject = "Your OTP Code for LoveTalks";
        const msg = `<h3>Your OTP Code is:</h3><p style="font-size: 18px; font-weight: bold;">${otp}</p><p>This code is valid for 10 minutes.</p>`;

        await sendEmailFn({ email, subject, msg });

        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error("Send OTP error:", error);
        return res.status(500).json({ message: "Failed to send OTP" });
    }
};


