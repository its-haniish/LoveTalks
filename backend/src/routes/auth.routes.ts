import { Router } from "express";
import * as userAuth from "../controllers/userAuth.controllers";
import * as mentorAuth from "../controllers/mentorAuth.controllers";
import { asyncHandler, validate } from "../middlewares";
import * as authValidator from "../validators/auth.validator"

const router = Router();

// =========================
// User Authentication Routes
// =========================
router.post("/user/signup", asyncHandler(validate(authValidator.userSignupSchema)), asyncHandler(userAuth.userSignup));
router.post("/user/login", asyncHandler(validate(authValidator.userLoginSchema)), asyncHandler(userAuth.userLogin));
router.post("/user/send-otp", asyncHandler(validate(authValidator.userSendOtpSchema)), asyncHandler(userAuth.sendUserOtp));
router.post("/user/reset-password", asyncHandler(validate(authValidator.userSendOtpSchema)), asyncHandler(userAuth.resetUserPassword));

// =========================
// Mentor Authentication Routes
// =========================
router.post("/mentor/signup", asyncHandler((validate(authValidator.mentorSignupSchema))), asyncHandler(mentorAuth.mentorSignup));
router.post("/mentor/login", asyncHandler(validate(authValidator.mentorLoginSchema)), asyncHandler(mentorAuth.mentorLogin));
router.post("/mentor/send-otp", asyncHandler(validate(authValidator.mentorSendOtpSchema)), asyncHandler(mentorAuth.sendMentorOtp));
router.post("/mentor/reset-password", asyncHandler(validate(authValidator.mentorResetPasswordSchema)), asyncHandler(mentorAuth.mentorResetPassword));

export default router;
