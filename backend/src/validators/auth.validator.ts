import { z } from "zod";

export const mentorSignupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10),
    password: z.string().min(6),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    country: z.string().min(1),
    rollNo: z.string().min(1),
    branch: z.string().min(1),
    year: z.string().min(1),
    skills: z.array(z.string()).min(1),
    idCard: z.string().optional(), // If used
    college: z.string().min(1),
    bio: z.string().min(1),
    profilePicture: z.string().min(1),
    gender: z.enum(["male", "female", "other"]),
});

export const mentorLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const mentorSendOtpSchema = z.object({
    email: z.string().email(),
});

export const mentorResetPasswordSchema = z.object({
    email: z.string().email(),
    newPassword: z.string().min(6),
    otp: z.string().min(4),
});

//=================USER SCHEMA=================
export const userSignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    country: z.string().min(1, "Country is required"),
  });
  
  export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  });
  
  export const userSendOtpSchema = z.object({
    email: z.string().email("Invalid email address"),
  });
  
  export const userResetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    otp: z.string().min(4, "OTP must be at least 4 digits"),
  });
